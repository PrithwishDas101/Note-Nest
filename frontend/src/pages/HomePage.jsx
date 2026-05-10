import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react";

import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import NoteCard from '../components/NoteCard.jsx'

const HomePage = () => {

  const [rateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      < Navbar data-theme="forest" />

      {rateLimited && < RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 text-base-content/60">
            <Loader2 className="size-6 animate-spin text-green-900" />
            <p className="mt-2 text-sm">Loading notes...</p>
          </div>
        )}

        {notes.length > 0 && !rateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}

      </div>

    </div>

  )
}

export default HomePage