import { Link } from "react-router-dom";
import { Pin, PinOff, Trash2, ArrowUpRight } from "lucide-react";
import { formatDate } from "../lib/utills.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!window.confirm("Delete this note? This action cannot be undone.")) return;

    try {
      await api.delete("/notes/" + note._id);
      setNotes((current) => current.filter((item) => item._id !== note._id));
      toast.success("Note deleted");
    } catch (error) {
      toast.error(error.response?.status === 429 ? "Too many requests. Try again shortly." : "Couldn't delete this note.");
    }
  };

  const handlePin = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await api.put("/notes/" + note._id, {
        title: note.title,
        content: note.content,
        pinned: !note.pinned,
      });
      setNotes((current) =>
        current.map((item) => item._id === note._id ? response.data : item)
      );
      toast.success(response.data.pinned ? "Note pinned" : "Note unpinned");
    } catch (error) {
      toast.error(error.response?.status === 429 ? "Too many requests. Try again shortly." : "Couldn't update this note.");
    }
  };

  return (
    <article className="note-card animate-fade-up flex min-h-[248px] flex-col rounded-2xl">
      <Link
        to={"/note/" + note._id}
        className="group flex flex-1 flex-col rounded-2xl p-5 focus-visible:outline-offset-[-4px] sm:p-6"
        aria-label={"Open note: " + note.title}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
            <span className="size-1.5 rounded-full bg-primary" />
            Note
          </span>
          <span className="text-xs text-base-content/50">{formatDate(new Date(note.updatedAt || note.createdAt))}</span>
        </div>

        <h2 className="mb-2 line-clamp-2 break-words text-lg font-semibold leading-snug tracking-[-0.035em] text-base-content sm:text-xl">
          {note.title}
        </h2>
        <p className="line-clamp-4 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-base-content/60">
          {note.content}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-base-content/10 pt-4">
          <span className="text-xs font-medium text-base-content/50">
            {note.pinned ? "Pinned note" : "Open note"}
          </span>
          <ArrowUpRight className="size-4 text-base-content/40 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </div>
      </Link>

      <div className="flex items-center justify-end gap-1 px-4 pb-3 sm:px-5">
        <button
          type="button"
          onClick={handlePin}
          className="inline-flex size-9 items-center justify-center rounded-full text-base-content/50 transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-offset-2"
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          title={note.pinned ? "Unpin note" : "Pin note"}
        >
          {note.pinned ? <PinOff className="size-4" /> : <Pin className="size-4" />}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex size-9 items-center justify-center rounded-full text-base-content/50 transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-offset-2"
          aria-label="Delete note"
          title="Delete note"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </article>
  );
};

export default NoteCard;