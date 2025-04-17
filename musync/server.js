const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Sync video selection
    socket.on('load', (data) => {
        socket.broadcast.emit('load', { ...data, timestamp: Date.now() });
    });

    // Sync playback state
    socket.on('play', (data) => {
        socket.broadcast.emit('play', { ...data, timestamp: Date.now() });
    });

    socket.on('pause', (data) => {
        socket.broadcast.emit('pause', { ...data, timestamp: Date.now() });
    });

    // Sync seek
    socket.on('seek', (data) => {
        socket.broadcast.emit('seek', { ...data, timestamp: Date.now() });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server listening on *:3000');
});