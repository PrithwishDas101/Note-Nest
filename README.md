# NoteNest

A full-stack notes app built with React, Vite, Tailwind CSS, DaisyUI, Express, MongoDB, and Supabase Auth.

**A quieter place for your thoughts.**

[Live demo](https://note-nest-zqph.onrender.com/) · [Repository](https://github.com/PrithwishDas101/Note-Nest)

## Overview

NoteNest keeps everyday ideas in a focused, responsive workspace. It retains the original DaisyUI **forest** theme, with considered spacing, readable typography, and subtle motion. Supabase Auth provides Google and GitHub OAuth plus email/password authentication and password recovery. The API scopes every note to its authenticated owner.

## Features

- Google and GitHub sign-in with Supabase Auth
- Email/password registration and sign-in
- Email confirmation support and forgot/reset password flow
- Authenticated, account-specific notes
- Create, edit, delete, search, and pin notes
- Sort by recently updated, recently created, or title
- Responsive notes grid and writing-focused editor
- Loading, empty, error, and rate-limit states
- Express API verifies Supabase access tokens before accessing notes
- MongoDB notes include an owner ID; one account cannot read or change another account's notes

## Tech stack

**Frontend:** React, React Router, Vite, Tailwind CSS, DaisyUI, Supabase JavaScript SDK, Axios, React Hot Toast, Lucide React

**Backend:** Node.js, Express, MongoDB, Mongoose

## Supabase setup

### 1. Create a Supabase project

Create a project in the [Supabase dashboard](https://supabase.com/dashboard). From **Project Settings → API**, copy the project URL and the publishable key (or legacy anon key). These are public client keys, not service-role secrets.

### 2. Enable Google sign-in

In Supabase, open **Authentication → Sign In / Providers → Google** and enable Google. In the Google Cloud Console, configure the OAuth consent screen and create a **Web application** OAuth client. Add your app origins to Authorized JavaScript origins: `http://localhost:5173` and `https://note-nest-zqph.onrender.com`. Add the exact Supabase callback URL shown in the Google provider settings to Authorized redirect URIs, then enter the Google Client ID and Client Secret in Supabase.

### 3. Enable GitHub sign-in

1. In Supabase, open **Authentication → Sign In / Providers → GitHub** and copy the displayed **Callback URL (for OAuth)**.
2. Open [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers), select **New OAuth App**, and enter:
   - **Application name:** NoteNest
   - **Homepage URL:** `https://note-nest-zqph.onrender.com`
   - **Authorization callback URL:** the exact Supabase callback URL copied above
3. Register the app, copy its Client ID, and generate a Client Secret.
4. Paste both into the Supabase GitHub provider settings and enable the provider. Keep the client secret private.

### 4. Configure redirect URLs

In Supabase, open **Authentication → URL Configuration**. Set Site URL to `https://note-nest-zqph.onrender.com`, and add these Redirect URLs:
- `http://localhost:5173/**`
- `https://note-nest-zqph.onrender.com/**`

### 5. Enable email/password and password recovery

In Supabase **Authentication → Sign In / Providers**, make sure the Email provider is enabled and password sign-in is allowed. Keep email confirmation enabled for production. Configure the confirmation and password-reset email templates if you want custom branding. Supabase's default email service is intended for limited testing; configure custom SMTP for reliable production delivery.

In **Authentication → URL Configuration**, ensure the local and production redirect URLs above are allow-listed. The app sends confirmation links back to `/login` and password reset links to `/reset-password`.

### 6. Configure environment variables

Copy `frontend/.env.example` to `frontend/.env` and set:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Copy `backend/.env.example` to `backend/.env` and set:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Never put a Supabase service-role key in frontend environment variables. The backend uses the public key only to ask Supabase Auth to verify the supplied access token.

For Render, set the `VITE_*` variables in the frontend build environment before running `npm run build`. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` as backend runtime environment variables. If frontend and backend run in one service, configure all four variables there. Redeploy after changing frontend build-time variables.

## Run locally

Requirements: Node.js, npm, a MongoDB connection string, and the Supabase setup above.

```bash
git clone https://github.com/PrithwishDas101/Note-Nest.git
cd Note-Nest
```

Start the backend in one terminal:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite runs at `http://localhost:5173` by default, and the development API is `http://localhost:5001/api`. If your local package lock is older than package.json, run `npm install` to refresh it before using `npm ci`.

## API endpoints

All endpoints require a valid Supabase bearer access token.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/notes` | List the signed-in user's notes |
| GET | `/api/notes/:id` | Get one of the user's notes |
| POST | `/api/notes` | Create a note for the signed-in user |
| PUT | `/api/notes/:id` | Update one of the user's notes |
| DELETE | `/api/notes/:id` | Delete one of the user's notes |

## Existing notes

Notes created before authentication do not have an owner ID, so the secured API intentionally will not expose them to any signed-in account. They remain in MongoDB and are not automatically assigned to the first person who signs in. Review ownership and migrate legacy notes to the correct Supabase user ID if you want to keep using them.

## Design notes

The UI keeps the existing forest palette and DaisyUI theme. The refresh focuses on hierarchy, spacing, touch-friendly controls, restrained transitions, clear feedback, and honoring the user's reduced-motion preference.

## License

MIT

## Author

**Prithwish Das** · [GitHub](https://github.com/PrithwishDas101)
