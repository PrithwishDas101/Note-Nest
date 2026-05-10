import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

const NotesNotFound = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-16 text-center">
      <div className="mb-5 rounded-full bg-primary/10 p-6">
        <NotebookPen className="size-9 text-primary" />
      </div>

      <h3 className="text-2xl font-semibold tracking-tight">No notes yet</h3>

      <p className="mt-2 text-sm leading-6 text-base-content/70">
        Create your first note and start organizing your thoughts.
      </p>

      <Link to="/create" className="btn btn-primary mt-6">
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;