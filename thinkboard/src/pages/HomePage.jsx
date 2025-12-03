import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { Home } from "lucide-react";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        console.log("Fetched notes:", response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {isRateLimited && <RateLimitedUI />}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Notes</h1>

        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {notes.map((note) =>
              note.title && note.content ? (
                <NoteCard
                  key={note.id}
                  note={note}
                  content={note.content}
                  setNotes={setNotes}
                />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
