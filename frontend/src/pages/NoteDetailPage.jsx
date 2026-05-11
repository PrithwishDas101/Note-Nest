import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { Loader2Icon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
      } catch (error) {
        if (error.response?.status === 429) {
          toast.error("Slow down! You are fetching notes too fast", {
            duration: 4000,
            icon: "🩻"
          })
        } else {
          toast.error("Failed to fetch note!")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNote();

  }, [id])

  const handleDelete = async () => {

    if (!window.confirm("Delete this note? This action cannot be undone.")) return;

    try {
      await api.delete(`/notes/${id}`); // deleting the note from the database
      toast.success("Note deleted!")
      navigate("/")
    } catch (error) {
      console.log("Error deleting note", error)
      toast.error("Failed to delete note!")
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully!");
      navigate("/")
    } catch (error) {
      console.log("Error saving the note", error)
      toast.error("Failed to update note!")
    } finally {
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-3">
        <Loader2Icon className="animate-spin size-10" />
        <span className="text-sm text-base-content/70 animate-bounce">
          Loading note
          <span className="animate-pulse">...</span>
        </span>
      </div>
    );
  }

  return (

    <div className='min-h-screen bg-base-300'>
      <div className='container mx-auto px-4 py-10'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            {/* Back Button */}
            <Link to={"/"} className="btn btn-ghost mb-5">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            {/* Delete Note Button */}
            <button onClick={handleDelete} className='btn btn-error btn-outline text-error mb-4'>
              < Trash2Icon className='size-4' />
              <span>Delete Note</span>
            </button>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              {/* Title */}
              <div className='form-control mb-5'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Note Title'
                  className='input input-bordered caret-primary'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              {/* Input */}
              <div className='form-control mb-5'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your thought here'
                  className='textarea textarea-bordered caret-primary h-36'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-outline btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage;