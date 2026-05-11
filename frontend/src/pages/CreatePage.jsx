import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react"
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    if (!cleanTitle || !cleanContent) {
      toast.error("All fields are required!!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title: cleanTitle,
        content: cleanContent,
      });

      toast.success("Note created succesfully!");
      navigate("/")
    } catch (error) {
      console.log("Error creating note", error)

      if (error.response?.status === 429) {
        toast.error("Slow down! You are creating notes too fast", {
          duration: 4000,
          icon: "🩻"
        })
      } else {
        toast.error("Failed to create note!")
      }
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link to={"/"} className="btn btn-ghost mb-5">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-5 ">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-5">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered caret-primary focus:outline-none focus:ring-2 focus:ring-slate-950"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
                {/* Content */}
                <div className="form-control mb-5">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your thought..."
                    className="textarea textarea-bordered caret-base-content h-36 focus:outline-none focus:ring-2 focus:ring-slate-950"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                </div>
                {/* Submit Button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage