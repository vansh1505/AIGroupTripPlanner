# Group Trip Planner

A full-stack web application to help groups plan trips collaboratively.
Users can create trips, share invite links, and join existing trips using a unique trip ID.

## Features

* Create a new trip
* Join trips using invite links
* View trip details
* REST API with MongoDB integration
* React frontend with React Router
* Responsive UI using Tailwind CSS

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Tailwind CSS
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# Project Structure

```bash
GroupTripPlanner/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/GroupTripPlanner.git
cd GroupTripPlanner
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Run backend server:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

Backend runs on:

```txt
http://localhost:3000
```

---

# API Endpoints

## Create Trip

```http
POST /api/trips
```

## Get Trip By ID

```http
GET /api/trips/:id
```

---

# Routes

| Route            | Description                 |
| ---------------- | --------------------------- |
| `/`              | Landing Page                |
| `/create-trip`   | Create a new trip           |
| `/join-trip`     | Join a trip manually        |
| `/join-trip/:id` | Join trip using invite link |

---

# Future Improvements

* Authentication
* Expense splitting
* Real-time group chat
* Itinerary planning
* Voting system for destinations
* Email invitations

---

Built because group travel planning in WhatsApp groups is basically digital anarchy.
