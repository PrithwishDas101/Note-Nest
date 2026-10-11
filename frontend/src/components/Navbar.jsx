import { Link, useLocation } from "react-router-dom";
import { NotebookPen, Plus, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <header className="sticky top-0 z-30 border-b border-base-content/10 bg-base-300/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-offset-4"
          aria-label="NoteNest home"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-200 group-hover:rotate-[-4deg]">
            <NotebookPen className="size-5" strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold tracking-[-0.04em] text-base-content sm:text-lg">
              NoteNest
            </span>
            <span className="hidden text-[11px] tracking-wide text-base-content/50 sm:block">
              A quieter place for your thoughts
            </span>
          </span>
        </Link>

        {isCreatePage ? (
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-base-content/10 px-3 text-sm font-medium text-base-content/75 transition-colors hover:border-primary/30 hover:bg-base-content/5 hover:text-base-content sm:px-4"
          >
            <ArrowLeft className="size-4" />
            <span>All notes</span>
          </Link>
        ) : (
          <Link
            to="/create"
            className="primary-action inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-content shadow-sm sm:px-5"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            <span>New note</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;