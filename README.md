# NoteNest

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react\&logoColor=white\&style=flat-square)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js\&logoColor=white\&style=flat-square)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?logo=mongodb\&logoColor=white\&style=flat-square)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express\&logoColor=white\&style=flat-square)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss\&logoColor=white\&style=flat-square)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

### A modern full-stack MERN notes application built with React, Express, MongoDB, and Tailwind CSS.

[Live Demo](#-live-demo) • [Features](#-features) • [Installation](#-installation) • [API](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

# Overview

**NoteNest** is a responsive note-taking application focused on simplicity, speed, and clean UI design.

Users can create, edit, delete, and manage notes through a modern card-based interface with responsive layouts, smooth interactions, toast notifications, loading states, and graceful rate-limit handling.

The project was built to practice and demonstrate practical full-stack development concepts including:

* REST API design
* CRUD operations
* MongoDB integration
* State management in React
* Deployment workflows
* API error handling
* Responsive UI design

---

# Features

* Create, edit, and delete notes
* Responsive layout for desktop and mobile
* Toast notifications for user actions
* Dedicated rate-limit handling UI
* Smooth hover effects and transitions
* Loading and empty states
* Forest-themed UI using DaisyUI
* Reusable React component architecture
* RESTful API integration using Axios

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Tailwind CSS
* DaisyUI
* Axios
* React Hot Toast
* Lucide React Icons
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Deployment

* Render Static Site (Frontend)
* Render Web Service (Backend)

---

# Screenshot

Home Page: ![alt text](<Note Nest Home Page.png>)
Create Notes Page: ![alt text](<Note Nest Create Page.png>)
Note Details Page: ![alt text](<Note Nest Note Details Page.png>)
---

# Live Demo

https://note-nest-zqph.onrender.com/

---

# Project Structure

```bash
NoteNest/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/NoteNest.git
cd NoteNest
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
FRONTEND_URL=http://localhost:5173
```

Run backend server:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
```

---

# API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/notes`     | Fetch all notes   |
| GET    | `/api/notes/:id` | Fetch single note |
| POST   | `/api/notes`     | Create new note   |
| PUT    | `/api/notes/:id` | Update note       |
| DELETE | `/api/notes/:id` | Delete note       |

---

# Deployment

## Frontend (Render Static Site)

### Build Command

```bash
npm install && npm run build
```

### Publish Directory

```bash
dist
```

---

## Backend (Render Web Service)

### Start Command

```bash
npm start
```

---

# Challenges Faced

During development and deployment, several practical issues were solved:

* React routing and navigation flow
* API state synchronization after deletion
* Render deployment configuration
* Linux file-name case sensitivity
* Axios production base URL handling
* Layout overflow and scroll issues
* Responsive grid behavior
* Error handling for invalid API responses

These debugging experiences helped strengthen understanding of real-world full-stack workflows.

---

# Future Improvements

* User authentication
* Search functionality
* Pinned notes
* Markdown support
* Categories and tags
* Theme switching
* Rich text editor
* Note archiving

---

# License

This project is licensed under the MIT License.

---

# Author

**Prithwish Das**

* GitHub: https://github.com/PrithwishDas101

---

<div align="center">

Made using the MERN Stack

</div>
