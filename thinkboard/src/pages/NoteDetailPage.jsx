import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Error fetching note:");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto flex items-center gap-3 mb-4">
        <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon />
          Back to Notes
        </Link>

        <button onClick={handleDelete} className="btn btn-error btn-outline">
          <Trash2Icon className="h-4 w-4 mr-1" />
          Delete Note
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <h2 className="card-title">{note?.title}</h2>
              <p className="mt-2 text-base-content/70">{note?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
