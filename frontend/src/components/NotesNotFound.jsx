import { NotebookPen, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = ({ hasSearch = false, onClearSearch }) => {
  return (
    <section className="surface-panel mx-auto flex max-w-xl flex-col items-center rounded-3xl px-6 py-14 text-center sm:px-10 sm:py-16">
      <div className="relative mb-6 grid size-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        {hasSearch ? <Search className="size-7" /> : <NotebookPen className="size-7" />}
        {!hasSearch && <Sparkles className="absolute -right-2 -top-2 size-4 text-primary/80" />}
      </div>

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
        {hasSearch ? "Nothing matched" : "A fresh page"}
      </p>
      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-base-content sm:text-3xl">
        {hasSearch ? "No notes found" : "Your ideas start here."}
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/60">
        {hasSearch
          ? "Try another title or phrase. Your notes are still right where you left them."
          : "Keep little thoughts, big plans, and everything in between in one calm space."}
      </p>

      {hasSearch ? (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-7 rounded-full border border-base-content/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          Clear search
        </button>
      ) : (
        <Link to="/create" className="primary-action mt-7 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-content">
          Create your first note
        </Link>
      )}
    </section>
  );
};

export default NotesNotFound;