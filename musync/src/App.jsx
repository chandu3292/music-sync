import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const API_KEY = 'AIzaSyAJgxLPkaF5t3EMBG8RYsXFxdckbLJD2yQ';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentVideo, setCurrentVideo] = useState({ videoId: '', title: '' });
    const [status, setStatus] = useState('Connecting to MuSync Room...');
    const [error, setError] = useState('');
    const playerRef = useRef(null);
    const seekSliderRef = useRef(null);
    const lastEventTimestamp = useRef(0);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('player', {
                height: '0',
                width: '0',
                videoId: '',
                playerVars: { autoplay: 0, controls: 0 },
                events: {
                    onReady: () => {
                        console.log('Player is ready');
                        setStatus('Connected to MuSync Room');
                    },
                    onStateChange: (event) => {
                        const time = playerRef.current.getCurrentTime();
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            socket.emit('play', { time });
                            setStatus(`Playing: ${currentVideo.title || 'Video'}`);
                        } else if (event.data === window.YT.PlayerState.PAUSED) {
                            socket.emit('pause', { time });
                            setStatus(`Paused: ${currentVideo.title || 'Video'}`);
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            socket.emit('seek', { time: 0 });
                            setStatus(`Ended: ${currentVideo.title || 'Video'}`);
                        }
                    },
                    onError: (event) => {
                        console.error('Player error:', event.data);
                        setError(`Error playing video (Code: ${event.data})`);
                    }
                }
            });
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                if (seekSliderRef.current && duration > 0) {
                    seekSliderRef.current.max = duration;
                    seekSliderRef.current.value = currentTime;
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        socket.on('connect', () => setStatus('Connected to MuSync Room'));
        socket.on('disconnect', () => setStatus('Disconnected from MuSync Room'));
        socket.on('load', (data) => {
            if (data.timestamp <= lastEventTimestamp.current) return;
            lastEventTimestamp.current = data.timestamp;
            setCurrentVideo({ videoId: data.videoId, title: data.title });
            if (playerRef.current) {
                playerRef.current.loadVideoById(data.videoId, 0);
                playerRef.current.playVideo();
                console.log('Loaded video:', data.title);
            }
            setStatus(`Playing: ${data.title}`);
        });
        socket.on('play', (data) => {
            if (data.timestamp <= lastEventTimestamp.current) return;
            lastEventTimestamp.current = data.timestamp;
            if (playerRef.current) {
                playerRef.current.seekTo(data.time, true);
                if (playerRef.current.getPlayerState() !== window.YT.PlayerState.PLAYING) {
                    playerRef.current.playVideo();
                }
                console.log('Played at:', data.time);
            }
        });
        socket.on('pause', (data) => {
            if (data.timestamp <= lastEventTimestamp.current) return;
            lastEventTimestamp.current = data.timestamp;
            if (playerRef.current) {
                playerRef.current.seekTo(data.time, true);
                if (playerRef.current.getPlayerState() !== window.YT.PlayerState.PAUSED) {
                    playerRef.current.pauseVideo();
                }
                console.log('Paused at:', data.time);
            }
        });
        socket.on('seek', (data) => {
            if (data.timestamp <= lastEventTimestamp.current) return;
            lastEventTimestamp.current = data.timestamp;
            if (playerRef.current) {
                playerRef.current.seekTo(data.time, true);
                if (playerRef.current.getPlayerState() !== window.YT.PlayerState.PLAYING && data.time > 0) {
                    playerRef.current.playVideo();
                }
                console.log('Sought to:', data.time);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('load');
            socket.off('play');
            socket.off('pause');
            socket.off('seek');
        };
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setError('Please enter a search query');
            return;
        }
        setError('');
        setSearchResults([]);
        setStatus('Searching...');
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}&maxResults=10`
            );
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setSearchResults(data.items.map(item => ({
                    videoId: item.id.videoId,
                    title: item.snippet.title
                })));
                setStatus('Connected to MuSync Room');
            } else {
                setError('No results found');
            }
        } catch (error) {
            setError(`Error searching: ${error.message}`);
        }
    };

    const handleLoadVideo = (videoId, title) => {
        if (!playerRef.current) {
            console.error('Player not initialized');
            return;
        }
        console.log('Loading video:', title, 'with ID:', videoId);
        setCurrentVideo({ videoId, title });
        playerRef.current.loadVideoById(videoId, 0);
        playerRef.current.playVideo();
        socket.emit('load', { videoId, title });
        setStatus(`Playing: ${title}`);
        setSearchResults([]);
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            socket.emit('play', { time: playerRef.current.getCurrentTime() });
        }
    };

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
            socket.emit('pause', { time: playerRef.current.getCurrentTime() });
        }
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (playerRef.current) {
            playerRef.current.seekTo(time, true);
            socket.emit('seek', { time });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1>MuSync</h1>
            <p id="tagline">Rhythm and Rhyme, Together in Time!</p>
            <div className="flex w-full max-w-xs">
                <input
                    type="text"
                    placeholder="Search YouTube videos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} className="ml-2">Search</button>
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            <div id="search-results">
                {searchResults.map((item) => (
                    <div
                        key={item.videoId}
                        className="result-item"
                        onClick={() => handleLoadVideo(item.videoId, item.title)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div id="player" style={{ display: 'none' }}></div>
            <div id="controls">
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
            </div>
            <input
                type="range"
                id="seek-slider"
                min="0"
                max="100"
                defaultValue="0"
                ref={seekSliderRef}
                onChange={handleSeek}
            />
            <p id="room-status">{status}</p>
            <p id="team-name">Created by Team MuSync</p>
        </div>
    );
}

export default App;