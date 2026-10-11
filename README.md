# NoteNest

A full-stack notes app built with React, Vite, Tailwind CSS, DaisyUI, Express, and MongoDB.

**A quieter place for your thoughts.**

[Live demo](https://note-nest-zqph.onrender.com/) · [Repository](https://github.com/PrithwishDas101/Note-Nest)

## Overview

NoteNest keeps everyday ideas in a focused, responsive workspace. The interface keeps its original DaisyUI **forest** theme, with more considered spacing, readable typography, and subtle motion.

## Features

- Create, edit, and delete notes
- Search note titles and content as you type
- Pin important notes and filter to pinned notes
- Sort by recently updated, recently created, or title
- Responsive notes grid and writing-focused editor
- Clear loading, empty, error, and rate-limit states
- Toast feedback for save, pin, and delete actions
- Keyboard-visible focus states and reduced-motion support
- REST API backed by MongoDB and Mongoose

## Tech stack

**Frontend:** React, React Router, Vite, Tailwind CSS, DaisyUI, Axios, React Hot Toast, Lucide React

**Backend:** Node.js, Express, MongoDB, Mongoose

## Project structure

\`\`\`text
Note-Nest/
├── frontend/
│   └── src/
│       ├── components/
│       ├── lib/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        └── server.js
\`\`\`

## Run locally

Requirements: Node.js, npm, and a MongoDB connection string.

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/PrithwishDas101/Note-Nest.git
cd Note-Nest
\`\`\`

### 2. Start the backend

\`\`\`bash
cd backend
npm install
\`\`\`

Create \`backend/.env\`:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
\`\`\`

Start the backend using the script available in \`backend/package.json\` (for example, \`npm run dev\` if configured).

### 3. Start the frontend

In a second terminal:

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

The Vite development server runs at \`http://localhost:5173\` by default. In development, the frontend API client connects to \`http://localhost:5001/api\`.

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | \`/api/notes\` | List notes |
| GET | \`/api/notes/:id\` | Get one note |
| POST | \`/api/notes\` | Create a note |
| PUT | \`/api/notes/:id\` | Update title, content, or pinned state |
| DELETE | \`/api/notes/:id\` | Delete a note |

## Design notes

The UI keeps the existing forest palette and DaisyUI theme. The refresh focuses on hierarchy, spacing, touch-friendly controls, restrained hover transitions, clear feedback, and honoring the user's reduced-motion preference.

## License

MIT

## Author

**Prithwish Das** · [GitHub](https://github.com/PrithwishDas101)