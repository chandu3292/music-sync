🎵 MuSync - Synchronized YouTube Audio Room
Welcome to MuSync, a real-time synchronized YouTube audio room application that allows multiple users to listen to the same music stream simultaneously. Built with React, Tailwind CSS, and the YouTube Iframe API, MuSync offers a seamless and modern experience with a classic dark green and black theme.

🚀 Features
🔍 Search and select YouTube videos for synchronized playback.

🔁 Real-time control (play, pause, seek) across all connected clients using Socket.IO.

🎯 Minimalist UI with automatic synchronization, no manual sync required.

👥 Perfect for collaborative music listening with friends or communities.

🧰 Prerequisites
Before you begin, make sure you have the following installed:

Node.js and npm

Git for version control

A YouTube Data API v3 key (configured in src/App.jsx)

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/chandu3292/music-sync.git
cd musync
Install dependencies:

bash
Copy
Edit
npm install
Resolve any security vulnerabilities (optional but recommended):

bash
Copy
Edit
npm audit fix --force
▶️ Usage
Start the backend server:

bash
Copy
Edit
node server.js
Start the development server:

bash
Copy
Edit
npm run dev
Open the app in your browser:

arduino
Copy
Edit
http://localhost:5173
How to use:

Open multiple tabs or devices to simulate multiple users.

Search for a YouTube video (e.g., "lofi hip hop").

Click on a video to start synchronized playback.

Use the play, pause, and seek controls to manage playback for all users.

Enjoy listening together, no matter where you are! 🎧✨
Made with 💚 by Chandu
