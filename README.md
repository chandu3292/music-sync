# music-sync

# MuSync - Synchronized YouTube Audio Room

Welcome to MuSync, a real-time synchronized YouTube audio room application that allows multiple users to listen to the same music stream simultaneously. Built with React, Tailwind CSS, and the YouTube Iframe API, MuSync offers a seamless experience with a classic dark green and black theme.

## Features
- Search and select YouTube videos for synchronized playback.
- Real-time control (play, pause, seek) across all connected clients using Socket.IO.
- Minimalist UI with automatic synchronization, avoiding manual sync buttons.
- Ideal for collaborative music listening sessions.

## Prerequisites
- Node.js and npm installed.
- Git installed for version control.
- A YouTube Data API v3 key (configured in `src/App.jsx`).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chandu3292/music-sync.git
   cd musync
Install dependencies:
bash

Copy
npm install
Resolve any security vulnerabilities:
bash

Copy
npm audit fix --force
Usage
Start the server:
bash

Copy
node server.js
Start the development server:
bash

Copy
npm run dev
Open your browser at http://localhost:5173 and connect multiple tabs or devices.
Search for a video (e.g., "lofi hip hop"), click a result to play, and use the play/pause/seek controls.
