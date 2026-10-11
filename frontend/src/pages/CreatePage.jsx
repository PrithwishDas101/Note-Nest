import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, FileText, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import Navbar from "../components/Navbar.jsx";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      toast.error("Add a title and a little something to remember.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title: cleanTitle, content: cleanContent });
      toast.success("Your note is saved.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.status === 429
        ? "You're saving notes a little too quickly. Try again shortly."
        : "Couldn't save this note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      <main className="page-shell px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-base-content/60 transition-colors hover:bg-base-content/5 hover:text-base-content">
            <ArrowLeft className="size-4" />
            Back to your notes
          </Link>

          <section className="animate-fade-up mb-7 sm:mb-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              Make room for a thought
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.065em] text-base-content sm:text-5xl">
              A new note.
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-base-content/60 sm:text-base">
              It doesn’t have to be perfect. Just get it out of your head and somewhere safe.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="surface-panel overflow-hidden rounded-3xl">
            <div className="border-b border-base-content/10 px-5 py-4 sm:px-8">
              <div className="flex items-center gap-2 text-xs text-base-content/50">
                <FileText className="size-4" />
                Untitled draft
                <span className="ml-auto">{content.length} characters</span>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <label htmlFor="note-title" className="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/50">
                Title
              </label>
              <input
                id="note-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={160}
                placeholder="Give this thought a name"
                autoFocus
                required
                className="editor-field min-h-14 rounded-xl px-4 text-lg font-medium tracking-tight sm:text-xl"
              />

              <label htmlFor="note-content" className="mb-3 mt-7 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/50">
                Your thoughts
              </label>
              <textarea
                id="note-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Start anywhere..."
                required
                rows={12}
                className="editor-field min-h-[280px] resize-y rounded-xl px-4 py-4 text-sm leading-7 sm:min-h-[360px]"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-base-content/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-xs text-base-content/50">Your note is saved when you choose Create note.</p>
              <div className="flex items-center justify-end gap-3">
                <Link to="/" className="rounded-full px-4 py-2.5 text-sm font-medium text-base-content/60 transition-colors hover:bg-base-content/5">
                  Cancel
                </Link>
                <button type="submit" disabled={loading} className="primary-action inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-content">
                  {loading ? <span className="loading loading-spinner loading-xs" /> : <Check className="size-4" />}
                  {loading ? "Saving..." : "Create note"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;