import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NotebookPen, ShieldCheck, LockKeyhole } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

const LoginPage = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();
  const location = useLocation();
  const [signingIn, setSigningIn] = useState(false);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-base-300">
        <span className="loading loading-spinner loading-md text-primary" />
      </main>
    );
  }

  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  const handleGoogleSignIn = async () => {
    if (!supabase) return;
    setSigningIn(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message || "Google sign-in couldn't be started.");
      setSigningIn(false);
    }
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-base-300 px-4 py-10 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-14rem] size-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-18rem] right-[-8rem] size-[28rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <section className="relative m-auto w-full max-w-md animate-fade-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 grid size-14 place-items-center rounded-[20px] border border-primary/20 bg-primary/10 text-primary shadow-sm">
            <NotebookPen className="size-7" strokeWidth={1.8} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Your thoughts, in one place</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.065em] text-base-content">Welcome to NoteNest.</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/60">
            A quieter place for your thoughts. Sign in to keep your notes private and synced to your account.
          </p>
        </div>

        <div className="surface-panel rounded-3xl p-6 sm:p-8">
          {isSupabaseConfigured ? (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-base-content/15 bg-base-100 px-4 text-sm font-semibold text-base-content shadow-sm transition-colors hover:border-primary/40 hover:bg-base-content/5 disabled:cursor-wait disabled:opacity-60"
              >
                {signingIn ? (
                  <span className="loading loading-spinner loading-sm text-primary" />
                ) : (
                  <svg viewBox="0 0 48 48" aria-hidden="true" className="size-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.93 13.72 18.01 9.5 24 9.5Z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 37.97 46.98 31.89 46.98 24.55Z" />
                    <path fill="#FBBC05" d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.57 10.78l7.47-6.19Z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.17 2.3-5.99 0-11.07-4.22-12.96-9.91l-7.98 6.19C6.51 41.62 14.62 48 24 48Z" />
                  </svg>
                )}
                {signingIn ? "Connecting to Google..." : "Continue with Google"}
              </button>
              <div className="mt-5 flex items-start gap-2.5 text-xs leading-5 text-base-content/50">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" />
                <p>Your notes are tied to your account. Only you can access them through NoteNest.</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-warning/20 bg-warning/5 p-4">
              <p className="text-sm font-semibold text-base-content">Supabase setup needed</p>
              <p className="mt-2 text-sm leading-6 text-base-content/65">
                Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the frontend environment, then enable Google in your Supabase Authentication settings.
              </p>
            </div>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-base-content/45">
          <ShieldCheck className="size-4 text-primary" />
          Private by design. Forest theme, same NoteNest.
        </p>
      </section>
    </main>
  );
};

export default LoginPage;