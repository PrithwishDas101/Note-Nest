import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NotebookPen, ShieldCheck, LockKeyhole, Chrome, Github, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

const LoginPage = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-base-300"><span className="loading loading-spinner loading-md text-primary" /></main>;
  }
  if (user) return <Navigate to={location.state?.from?.pathname || "/"} replace />;

  const runOAuth = async (provider) => {
    if (!supabase || busy) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      toast.error(error.message || `${provider} sign-in couldn't be started.`);
      setBusy(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    if (!supabase || busy) return;
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Your NoteNest account is ready.");
        } else {
          toast.success("Check your inbox to confirm your email, then sign in.");
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Welcome back to NoteNest.");
      }
    } catch (error) {
      toast.error(error.message || "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!supabase || busy) return;
    if (!email.trim()) {
      toast.error("Enter your email address first.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("If an account exists for that email, a reset link is on its way.");
      setMode("signin");
    } catch (error) {
      toast.error(error.message || "Couldn't send a reset email.");
    } finally {
      setBusy(false);
    }
  };

  const heading = mode === "signup" ? "Create your account." : mode === "forgot" ? "Reset your password." : "Welcome to NoteNest.";
  const description = mode === "signup"
    ? "Make a little room for every thought."
    : mode === "forgot"
      ? "We'll email you a secure link to choose a new password."
      : "A quieter place for your thoughts. Sign in to keep your notes private and synced to your account.";

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
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.065em] text-base-content">{heading}</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/60">{description}</p>
        </div>

        <div className="surface-panel rounded-3xl p-6 sm:p-8">
          {!isSupabaseConfigured ? (
            <div className="rounded-2xl border border-warning/20 bg-warning/5 p-4">
              <p className="text-sm font-semibold text-base-content">Supabase setup needed</p>
              <p className="mt-2 text-sm leading-6 text-base-content/60">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the frontend environment, then rebuild the app.</p>
            </div>
          ) : mode === "forgot" ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <label className="form-control w-full gap-2">
                <span className="label-text text-sm font-medium">Email address</span>
                <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="input input-bordered w-full bg-base-100" />
              </label>
              <button type="submit" disabled={busy} className="btn btn-primary min-h-12 w-full rounded-xl">
                {busy ? <span className="loading loading-spinner loading-sm" /> : "Send password reset link"}
              </button>
              <button type="button" onClick={() => setMode("signin")} className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-base-content/65 transition hover:text-primary"><ArrowLeft size={16} /> Back to sign in</button>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-base-200 p-1">
                <button type="button" onClick={() => setMode("signin")} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${mode === "signin" ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/60 hover:text-base-content"}`}>Sign in</button>
                <button type="button" onClick={() => setMode("signup")} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${mode === "signup" ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/60 hover:text-base-content"}`}>Create account</button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => runOAuth("google")} disabled={busy} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-base-content/20 bg-base-100 px-3 text-sm font-semibold text-base-content shadow-sm transition-colors hover:border-primary/40 hover:bg-base-content/5 disabled:cursor-wait disabled:opacity-60">
                  <Chrome size={18} /> Google
                </button>
                <button type="button" onClick={() => runOAuth("github")} disabled={busy} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-base-content/20 bg-base-100 px-3 text-sm font-semibold text-base-content shadow-sm transition-colors hover:border-primary/40 hover:bg-base-content/5 disabled:cursor-wait disabled:opacity-60">
                  <Github size={18} /> GitHub
                </button>
              </div>

              <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-base-content/10" /><span className="text-xs text-base-content/45">or use email</span><div className="h-px flex-1 bg-base-content/10" /></div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <label className="form-control w-full gap-2">
                  <span className="label-text text-sm font-medium">Email address</span>
                  <span className="relative">
                    <Mail size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="input input-bordered w-full bg-base-100 pl-10" />
                  </span>
                </label>
                <label className="form-control w-full gap-2">
                  <span className="label-text text-sm font-medium">Password</span>
                  <span className="relative">
                    <LockKeyhole size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder={mode === "signup" ? "At least 6 characters" : "Your password"} className="input input-bordered w-full bg-base-100 pl-10 pr-11" />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/45 hover:text-base-content">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                  </span>
                </label>
                {mode === "signin" && <div className="text-right"><button type="button" onClick={() => setMode("forgot")} className="text-sm font-medium text-primary hover:underline">Forgot password?</button></div>}
                <button type="submit" disabled={busy} className="btn btn-primary min-h-12 w-full rounded-xl">
                  {busy ? <span className="loading loading-spinner loading-sm" /> : mode === "signup" ? "Create account" : "Sign in with email"}
                </button>
              </form>
              {mode === "signup" && <p className="mt-4 text-center text-xs leading-5 text-base-content/50">You may need to confirm your email before signing in.</p>}
              <div className="mt-5 flex items-start gap-2.5 text-xs leading-5 text-base-content/50"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" /><p>Your notes are tied to your account. Only you can access them through NoteNest.</p></div>
            </>
          )}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-base-content/50"><ShieldCheck className="size-4 text-primary" /> Private by design. Forest theme, same NoteNest.</p>
      </section>
    </main>
  );
};

export default LoginPage;
