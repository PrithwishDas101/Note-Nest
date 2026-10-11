import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, NotebookText, Pin } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const response = await api.get("/notes");
      setNotes(Array.isArray(response.data) ? response.data : []);
      setRateLimited(false);
    } catch (error) {
      if (error.response?.status === 429) {
        setRateLimited(true);
      } else {
        setLoadError(true);
        toast.error("Couldn't load your notes. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const visibleNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return [...notes]
      .filter((note) => {
        const matchesSearch = !query ||
          note.title?.toLocaleLowerCase().includes(query) ||
          note.content?.toLocaleLowerCase().includes(query);
        return matchesSearch && (!showPinnedOnly || note.pinned);
      })
      .sort((a, b) => {
        if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
        if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
        const dateA = new Date(sortBy === "created" ? a.createdAt : (a.updatedAt || a.createdAt)).getTime();
        const dateB = new Date(sortBy === "created" ? b.createdAt : (b.updatedAt || b.createdAt)).getTime();
        return dateB - dateA;
      });
  }, [notes, search, sortBy, showPinnedOnly]);

  const pinnedCount = notes.filter((note) => note.pinned).length;

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />
      <main className="page-shell">
        {rateLimited && <RateLimitedUI />}

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <section className="animate-fade-up mb-9 flex flex-col gap-7 md:mb-11 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Your personal space
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.065em] text-base-content sm:text-5xl lg:text-6xl">
                Thoughts, <span className="text-base-content/45">kept close.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-base-content/60 sm:text-base">
                A little room for the ideas you don’t want to lose.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-base-content/10 bg-base-content/[0.025] px-4 py-3 md:min-w-[160px]">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <NotebookText className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold leading-none tracking-tight text-base-content">{notes.length}</p>
                <p className="mt-1.5 text-xs text-base-content/50">{notes.length === 1 ? "note saved" : "notes saved"}</p>
              </div>
            </div>
          </section>

          <section aria-label="Find and organize notes" className="mb-7 flex flex-col gap-3 rounded-2xl border border-base-content/10 bg-base-content/[0.025] p-3 sm:flex-row sm:items-center sm:p-3.5">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search titles and note content..."
                aria-label="Search notes"
                className="editor-field min-h-11 rounded-xl pl-11 pr-4 text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <label className="relative flex min-h-11 flex-1 items-center gap-2 rounded-xl border border-base-content/10 px-3 text-sm text-base-content/65 sm:flex-none">
                <SlidersHorizontal className="size-4 shrink-0 text-base-content/45" />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-w-0 flex-1 cursor-pointer bg-transparent pr-1 text-sm outline-none sm:w-[125px]"
                  aria-label="Sort notes"
                >
                  <option value="updated">Recently updated</option>
                  <option value="created">Recently created</option>
                  <option value="title">Title A–Z</option>
                </select>
              </label>

              <button
                type="button"
                onClick={() => setShowPinnedOnly((value) => !value)}
                aria-pressed={showPinnedOnly}
                className={"inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors " + (showPinnedOnly ? "border-primary/40 bg-primary/10 text-primary" : "border-base-content/10 text-base-content/60 hover:bg-base-content/5")}
              >
                <Pin className="size-4" />
                <span>Pinned</span>
                <span className="text-xs opacity-70">{pinnedCount}</span>
              </button>
            </div>
          </section>

          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-base-content/80">
              {showPinnedOnly ? "Pinned notes" : search.trim() ? "Search results" : "All notes"}
            </h2>
            <p className="text-xs tabular-nums text-base-content/40">
              {visibleNotes.length} {visibleNotes.length === 1 ? "result" : "results"}
            </p>
          </div>

          {loading && (
            <div className="surface-panel flex min-h-56 flex-col items-center justify-center rounded-3xl text-base-content/60" role="status">
              <span className="loading loading-spinner loading-md text-primary" />
              <p className="mt-4 text-sm">Gathering your notes...</p>
            </div>
          )}

          {!loading && loadError && !rateLimited && (
            <section className="surface-panel rounded-3xl px-6 py-12 text-center">
              <h2 className="text-xl font-semibold tracking-tight">Your notes are taking a moment.</h2>
              <p className="mt-2 text-sm text-base-content/60">Check your connection and give it another try.</p>
              <button type="button" onClick={fetchNotes} className="primary-action mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content">
                Try again
              </button>
            </section>
          )}

          {!loading && !loadError && !rateLimited && visibleNotes.length === 0 && (
            <NotesNotFound
              hasSearch={Boolean(search.trim() || showPinnedOnly)}
              onClearSearch={() => { setSearch(""); setShowPinnedOnly(false); }}
            />
          )}

          {!loading && !loadError && visibleNotes.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {visibleNotes.map((note, index) => (
                <div key={note._id} style={{ animationDelay: Math.min(index, 8) * 35 + "ms" }}>
                  <NoteCard note={note} setNotes={setNotes} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;