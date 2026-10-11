import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LockKeyhole, NotebookPen, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase.js";

const ResetPasswordPage = () => {
  const { user, loading, isSupabaseConfigured } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);

  if (loading) return <main className="grid min-h-screen place-items-center bg-base-300"><span className="loading loading-spinner loading-md text-primary" /></main>;
  if (user && complete) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabase || busy) return;
    if (password.length < 6) return toast.error("Use at least 6 characters for your password.");
    if (password !== confirmPassword) return toast.error("Those passwords don't match.");
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setComplete(true);
      toast.success("Password updated. You're all set.");
      await supabase.auth.signOut();
    } catch (error) {
      toast.error(error.message || "Couldn't update your password. Open the latest reset link and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-base-300 px-4 py-10 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-[-14rem] size-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" /></div>
      <section className="relative m-auto w-full max-w-md animate-fade-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 grid size-14 place-items-center rounded-[20px] border border-primary/20 bg-primary/10 text-primary shadow-sm"><NotebookPen className="size-7" /></div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">A fresh start</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.065em] text-base-content">Choose a new password.</h1>
          <p className="mt-3 text-sm leading-6 text-base-content/60">Set a new password for your NoteNest account.</p>
        </div>
        <div className="surface-panel rounded-3xl p-6 sm:p-8">
          {!isSupabaseConfigured ? <p className="text-sm text-base-content/65">Supabase isn't configured for this app.</p> : complete ? (
            <div className="space-y-4 text-center"><p className="font-semibold">Password updated successfully.</p><Link to="/login" className="btn btn-primary w-full rounded-xl">Return to sign in</Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="form-control w-full gap-2"><span className="label-text text-sm font-medium">New password</span><input type="password" autoComplete="new-password" minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} className="input input-bordered w-full bg-base-100" placeholder="At least 6 characters" /></label>
              <label className="form-control w-full gap-2"><span className="label-text text-sm font-medium">Confirm new password</span><input type="password" autoComplete="new-password" minLength={6} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="input input-bordered w-full bg-base-100" placeholder="Enter it again" /></label>
              <button type="submit" disabled={busy} className="btn btn-primary min-h-12 w-full rounded-xl">{busy ? <span className="loading loading-spinner loading-sm" /> : <><LockKeyhole size={17} /> Update password</>}</button>
            </form>
          )}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-base-content/50"><ShieldCheck className="size-4 text-primary" /> Secure password recovery</p>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
