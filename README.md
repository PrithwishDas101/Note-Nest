# NoteNest

A full-stack notes app built with React, Vite, Tailwind CSS, DaisyUI, Express, MongoDB, and Supabase Auth.

**A quieter place for your thoughts.**

[Live demo](https://note-nest-zqph.onrender.com/) · [Repository](https://github.com/PrithwishDas101/Note-Nest)

## Overview

NoteNest keeps everyday ideas in a focused, responsive workspace. It retains the original DaisyUI **forest** theme, with considered spacing, readable typography, and subtle motion. Google sign-in is powered by Supabase Auth, and the API scopes every note to its authenticated owner.

## Features

- Google sign-in and sign-out with Supabase Auth
- Authenticated, account-specific notes
- Create, edit, delete, search, and pin notes
- Sort by recently updated, recently created, or title
- Responsive notes grid and writing-focused editor
- Loading, empty, error, and rate-limit states
- Toast feedback, keyboard-visible focus, and reduced-motion support
- Express API verifies Supabase access tokens before accessing notes
- MongoDB notes include an owner ID; one account cannot read or change another account's notes

## Tech stack

**Frontend:** React, React Router, Vite, Tailwind CSS, DaisyUI, Supabase JavaScript SDK, Axios, React Hot Toast, Lucide React

**Backend:** Node.js, Express, MongoDB, Mongoose

## Supabase setup

### 1. Create a Supabase project

Create a project in the [Supabase dashboard](https://supabase.com/dashboard). From **Project Settings → API**, copy the project URL and the publishable key (or legacy anon key). These are public client keys, not service-role secrets.

### 2. Enable Google as an auth provider

In Supabase, open **Authentication → Sign In / Providers → Google** and enable Google. In the Google Cloud Console:

1. Configure the OAuth consent screen.
2. Create an OAuth client ID with application type **Web application**.
3. Add your app origins to **Authorized JavaScript origins**: \`http://localhost:5173\` and your deployed NoteNest origin.
4. Add the Supabase callback URL shown in the Google provider settings to **Authorized redirect URIs**. It normally looks like \`https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback\`.
5. Copy the Google client ID and client secret into the Supabase Google provider settings.

Then open **Authentication → URL Configuration** in Supabase and set the Site URL to your deployed NoteNest origin. Add these Redirect URLs:
- \`http://localhost:5173/**\`
- \`https://note-nest-zqph.onrender.com/**\`

If you use a different production domain, add that exact domain as well.

### 3. Configure environment variables

Copy \`frontend/.env.example\` to \`frontend/.env\` and set:

\`\`\`env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
\`\`\`

Copy \`backend/.env.example\` to \`backend/.env\` and set:

\`\`\`env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
\`\`\`

Never put a Supabase service-role key in frontend environment variables. The backend uses the public key only to ask Supabase Auth to verify the supplied access token.

For Render, set the \`VITE_*\` variables in the frontend build environment before running \`npm run build\`. Set \`SUPABASE_URL\` and \`SUPABASE_ANON_KEY\` as backend runtime environment variables. Redeploy after changing build-time variables.

## Run locally

Requirements: Node.js, npm, a MongoDB connection string, and the Supabase setup above.

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/PrithwishDas101/Note-Nest.git
cd Note-Nest
\`\`\`

### 2. Start the backend

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### 3. Start the frontend

In a second terminal:

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Vite runs at \`http://localhost:5173\` by default, and the development API is \`http://localhost:5001/api\`. After adding the Supabase SDK dependency, use \`npm install\` (rather than \`npm ci\` with an older lockfile) so npm can refresh the frontend lockfile.

## API endpoints

All endpoints below require a valid Supabase bearer access token.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | \`/api/notes\` | List the signed-in user's notes |
| GET | \`/api/notes/:id\` | Get one of the user's notes |
| POST | \`/api/notes\` | Create a note for the signed-in user |
| PUT | \`/api/notes/:id\` | Update one of the user's notes |
| DELETE | \`/api/notes/:id\` | Delete one of the user's notes |

## Existing notes

Notes created before authentication do not have an owner ID, so the secured API intentionally will not expose them to any signed-in account. They remain in MongoDB and are not automatically assigned to the first person who signs in. If you want to keep those legacy notes, review their ownership and migrate them to the correct Supabase user ID before using the authenticated app.

## Design notes

The UI keeps the existing forest palette and DaisyUI theme. The refresh focuses on hierarchy, spacing, touch-friendly controls, restrained transitions, clear feedback, and honoring the user's reduced-motion preference.

## License

MIT

## Author

**Prithwish Das** · [GitHub](https://github.com/PrithwishDas101)