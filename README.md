# 🎵 MuSync - Synchronized YouTube Audio Rooms

Welcome to MuSync, a real-time synchronized YouTube audio room application that allows multiple users to listen to the same music stream simultaneously. Built with **React**, **Tailwind CSS**, and the **YouTube Iframe API**, MuSync offers a seamless and modern experience with a classic dark green and black theme.

---

## 🚀 Features

- 🔍 Search and select YouTube videos for synchronized playback.
- 🔁 Real-time control (play, pause, seek) across all connected clients using **Socket.IO**.
- 🎯 Minimalist UI with automatic synchronization, no manual sync required.
- 👥 Perfect for collaborative music listening with friends or communities.

---

## 🧰 Prerequisites

Make sure the following are installed before getting started:

- [Node.js](https://nodejs.org/) and `npm`
- [Git](https://git-scm.com/) for version control
- A **YouTube Data API v3** key (to be configured in `src/App.jsx`)

---

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/chandu3292/music-sync.git
cd musync
```

### 2. Install dependencies and fix any vulnerabilities

```bash
npm install
npm audit fix --force
```

### 3. Start the backend server

```bash
node server.js
```

### 4. Start the frontend development server

```bash
npm run dev
```

### 5. Open the app

Go to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎧 How to Use

- Open multiple tabs or devices to simulate multiple users.
- Search for a YouTube video (e.g., “lofi hip hop”).
- Click a video to start synchronized playback.
- Use play, pause, and seek — changes reflect for all users instantly.
- Enjoy music together in sync, wherever you are! 🌍

---

_Made with 💚 by **Chandu**_
