# NoteNest

**A quieter place for your thoughts.**

NoteNest is a full-stack notes application built with React, Vite, Tailwind CSS, DaisyUI, Express, MongoDB, and Supabase Auth. It provides a focused writing workspace with account-specific notes and OAuth or email/password sign-in.

## Features

- Google and GitHub OAuth through Supabase Auth
- Email/password registration and sign-in
- Email confirmation and password recovery/reset flows
- Create, edit, delete, search, and pin notes
- Sort notes by recently updated, recently created, or title
- Responsive notes grid and writing-focused editor
- Loading, empty, error, and rate-limit states
- Owner-scoped notes: the API verifies Supabase access tokens and associates each note with its authenticated owner
- DaisyUI forest theme and responsive Tailwind styling

## Live demo

[Open NoteNest](https://note-nest-zqph.onrender.com/)

The deployed frontend and API depend on their corresponding environment settings and external Supabase/database services being available.

## Tech stack

**Frontend:** React, React Router, Vite, Tailwind CSS, DaisyUI, Supabase JavaScript SDK, Axios, React Hot Toast, Lucide React.

**Backend:** Node.js, Express, MongoDB, Mongoose, Supabase token verification.

## Repository layout

```text
Note-Nest/
├── frontend/   # React + Vite application
├── backend/    # Express API and MongoDB models
└── package.json
```

## Run locally

Requirements: Node.js, npm, a MongoDB database, and a Supabase project.

```bash
git clone https://github.com/PrithwishDas101/Note-Nest.git
cd Note-Nest
npm install
```

The root scripts install the frontend/backend dependencies and build the frontend. For local development, install and run each app from its own directory:

```bash
cd backend
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Check each package's scripts and configuration for the exact development command and port.

## Environment configuration

Configure the frontend with the Supabase project URL and public anon/publishable key, plus the API base URL expected by the frontend. Configure the backend with its MongoDB connection string, Supabase token-verification settings, and port. Use the environment variable names documented by the respective frontend/backend configuration files.

Do not commit secrets or put a Supabase service-role key in frontend variables.

## Security model

The backend verifies Supabase access tokens before serving private note data. Notes are associated with an owner ID so one account should not be able to read or modify another user's notes. Keep this server-side ownership check in place when adding endpoints.

## Deployment

The root `build` script installs the nested dependencies and builds the frontend; the root `start` script starts the backend. Deploy the frontend and backend with their respective environment variables, and ensure the configured API URL, CORS origin, Supabase redirect URLs, and database access match the deployed domains.

---

Built by [Prithwish Das](https://github.com/PrithwishDas101).