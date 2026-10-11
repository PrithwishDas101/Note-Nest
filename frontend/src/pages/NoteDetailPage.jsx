import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Check, Clock3, FileText, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios.js";
import { formatDate } from "../lib/utills.js";
import Navbar from "../components/Navbar.jsx";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNote = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/notes/" + id);
      setNote(response.data);
    } catch (error) {
      toast.error(error.response?.status === 429
        ? "Too many requests. Give it a moment."
        : "Couldn't find that note.");
      if (error.response?.status === 404) navigate("/");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!note?.title.trim() || !note?.content.trim()) {
      toast.error("A title and content are needed to save.");
      return;
    }

    setSaving(true);
    try {
      await api.put("/notes/" + id, {
        title: note.title.trim(),
        content: note.content.trim(),
        pinned: Boolean(note.pinned),
      });
      toast.success("Changes saved.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.status === 429
        ? "You're saving too quickly. Try again shortly."
        : "Couldn't save your changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note permanently? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await api.delete("/notes/" + id);
      toast.success("Note deleted.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.status === 429
        ? "Too many requests. Try again shortly."
        : "Couldn't delete this note.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <main className="page-shell grid place-items-center px-4">
          <div className="flex flex-col items-center gap-4 text-base-content/50" role="status">
            <span className="loading loading-spinner loading-md text-primary" />
            <p className="text-sm">Opening your note...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <main className="page-shell flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">This note isn’t here.</h1>
          <p className="mt-2 text-sm text-base-content/60">It may have been deleted or the link may be out of date.</p>
          <Link to="/" className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content">Back to notes</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      <main className="page-shell px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 flex items-center justify-between gap-3">
            <Link to="/" className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-base-content/60 transition-colors hover:bg-base-content/5 hover:text-base-content">
              <ArrowLeft className="size-4" />
              All notes
            </Link>
            <button type="button" onClick={handleDelete} disabled={deleting} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-error/20 px-3 text-sm font-medium text-error/80 transition-colors hover:bg-error/10 hover:text-error disabled:opacity-50 sm:px-4">
              {deleting ? <span className="loading loading-spinner loading-xs" /> : <Trash2 className="size-4" />}
              <span>{deleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="surface-panel animate-fade-up overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-base-content/10 px-5 py-4 sm:px-8">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-base-content">Edit note</p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-base-content/50">
                  <Clock3 className="size-3.5" />
                  Updated {formatDate(new Date(note.updatedAt || note.createdAt))}
                </p>
              </div>
              {note.pinned && <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">Pinned</span>}
            </div>

            <div className="p-5 sm:p-8">
              <label htmlFor="edit-title" className="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/50">Title</label>
              <input
                id="edit-title"
                type="text"
                value={note.title}
                maxLength={160}
                onChange={(event) => setNote({ ...note, title: event.target.value })}
                required
                className="editor-field min-h-14 rounded-xl px-4 text-lg font-medium tracking-tight sm:text-xl"
              />

              <label htmlFor="edit-content" className="mb-3 mt-7 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/50">Content</label>
              <textarea
                id="edit-content"
                value={note.content}
                onChange={(event) => setNote({ ...note, content: event.target.value })}
                required
                rows={14}
                className="editor-field min-h-[320px] resize-y rounded-xl px-4 py-4 text-sm leading-7 sm:min-h-[400px]"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-base-content/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-xs text-base-content/50">Take your time. You can always edit this later.</p>
              <div className="flex items-center justify-end gap-3">
                <Link to="/" className="rounded-full px-4 py-2.5 text-sm font-medium text-base-content/60 transition-colors hover:bg-base-content/5">Cancel</Link>
                <button type="submit" disabled={saving || deleting} className="primary-action inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-content">
                  {saving ? <span className="loading loading-spinner loading-xs" /> : <Check className="size-4" />}
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NoteDetailPage;