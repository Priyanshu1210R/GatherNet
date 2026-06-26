# GatherNet 🎥

A real-time video conferencing web application that enables seamless peer-to-peer video calls with in-meeting chat, screen sharing, and meeting history — built with React, Node.js, Socket.IO, and WebRTC.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Pages & Routes](#pages--routes)
- [Contributing](#contributing)

---

## Features

- 🔐 **User Authentication** — Register and log in with hashed passwords (bcrypt)
- 📹 **Real-time Video Calls** — Peer-to-peer video via WebRTC with STUN server support
- 🎙️ **Audio/Video Controls** — Toggle camera and microphone during a call
- 🖥️ **Screen Sharing** — Share your screen with all participants in the room
- 💬 **In-call Chat** — Send and receive messages in real time during a meeting
- 📋 **Meeting History** — View a log of all previously attended meetings
- 👤 **Guest Access** — Join a meeting as a guest without registering
- 📱 **Responsive UI** — Material UI components for a clean, mobile-friendly interface

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Material UI (MUI) v5 | UI components & icons |
| Socket.IO Client | Real-time communication |
| WebRTC (Browser API) | Peer-to-peer video/audio |
| Axios | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| Socket.IO | WebSocket server for signaling |
| MongoDB + Mongoose | Database for users & meetings |
| bcrypt | Password hashing |
| dotenv | Environment variable management |
| nodemon / pm2 | Development / production process management |

---

## Project Structure

```
GatherNet-main/
├── backend/
│   └── src/
│       ├── app.js                     # Express server entry point
│       ├── controllers/
│       │   ├── socketManager.js       # Socket.IO signaling logic
│       │   └── user.controller.js     # Auth & meeting history handlers
│       ├── models/
│       │   ├── user.model.js          # User schema (name, username, password, token)
│       │   └── meeting.model.js       # Meeting schema (user_id, meetingCode, date)
│       └── routes/
│           └── users.routes.js        # User API routes
├── frontend/
│   └── src/
│       ├── App.js                     # Root component & route definitions
│       ├── contexts/
│       │   └── AuthContext.jsx        # Auth state & API calls (login, register, history)
│       ├── pages/
│       │   ├── landing.jsx            # Public landing page
│       │   ├── authentication.jsx     # Login / Register form
│       │   ├── home.jsx               # Dashboard — join a meeting by code
│       │   ├── VideoMeet.jsx          # Core video call room component
│       │   └── history.jsx            # User's meeting history
│       ├── utils/
│       │   └── withAuth.jsx           # HOC for protected routes
│       └── environment.js             # Backend URL configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)

---

### Environment Variables

Create a `.env` file inside the `backend/` directory with the following values:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/gathernet
```

For the frontend, update `src/environment.js` to point to your backend URL:

```js
// frontend/src/environment.js
const server = "http://localhost:8000";
export default server;
```

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/GatherNet.git
cd GatherNet
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Install frontend dependencies**
```bash
cd ../frontend
npm install
```

---

### Running the App

**Start the backend (development)**
```bash
cd backend
npm run dev
# Server runs on http://localhost:8000
```

**Start the frontend**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

**Production (backend with pm2)**
```bash
cd backend
npm run prod
```

---

## API Endpoints

Base URL: `/api/v1/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/login` | Log in with username & password; returns a session token | No |
| `POST` | `/register` | Create a new user account | No |
| `GET` | `/get_user_history?token=<token>` | Fetch the meeting history for the authenticated user | Token |
| `POST` | `/add_to_history` | Save a meeting code to the user's history | Token |

---

## Socket Events

GatherNet uses Socket.IO for WebRTC signaling and real-time chat.

| Event | Direction | Description |
|-------|-----------|-------------|
| `join-call` | Client → Server | Join a meeting room by URL/code |
| `user-joined` | Server → Client | Notifies all peers a new user has connected |
| `signal` | Client ↔ Server | Relays WebRTC offer/answer/ICE candidates between peers |
| `chat-message` | Client ↔ Server | Sends and broadcasts a chat message within a room |
| `user-left` | Server → Client | Notifies peers when a participant disconnects |
| `disconnect` | Client → Server | Automatically fired when a user leaves or closes the tab |

---

## Pages & Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | `LandingPage` | Public |
| `/auth` | `Authentication` | Public |
| `/home` | `HomeComponent` | Protected (requires login) |
| `/history` | `History` | Protected (requires login) |
| `/:url` | `VideoMeetComponent` | Public (guests can join) |

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

> **GatherNet** — *Cover a distance, connect with your loved ones.*
