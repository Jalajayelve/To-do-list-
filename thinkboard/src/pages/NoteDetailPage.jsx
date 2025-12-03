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

  // new UI-only state for edit mode and local temporary edits
  const [isEditing, setIsEditing] = React.useState(false);
  const [editTitle, setEditTitle] = React.useState("");
  const [editContent, setEditContent] = React.useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
        // initialize edit fields so user can immediately edit if toggled
        setEditTitle(response.data?.title || "");
        setEditContent(response.data?.content || "");
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

  // Minimal save logic (only for UI to persist edits)
  const handleSave = async () => {
    // prevent multiple saves
    if (saving) return;

    setSaving(true);
    try {
      // keep API shape simple: update title/content only
      const payload = {
        ...note,
        title: editTitle,
        content: editContent,
      };
      // PUT to update note on backend
      await api.put(`/notes/${id}`, payload);
      // update local note state (so UI reflects saved changes)
      setNote(payload);
      setIsEditing(false);
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // revert edit inputs to the last-saved note values
    setEditTitle(note?.title || "");
    setEditContent(note?.content || "");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header: back on left, delete centered, edit/save on right */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="grid grid-cols-3 items-center gap-4">
          {/* left: back */}
          <div className="col-start-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-lg font-medium text-gray-900 hover:opacity-90"
            >
              <ArrowLeftIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Back to Notes</span>
            </Link>
          </div>

          {/* center: delete (centered) */}
          <div className="col-start-2 flex justify-center">
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-3 px-5 py-2.5 border-2 rounded-lg text-red-500 border-red-200 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100"
              aria-label="Delete note"
            >
              <Trash2Icon className="h-5 w-5" />
              <span className="font-medium">Delete Note</span>
            </button>
          </div>

          {/* right: edit / save / cancel */}
          <div className="col-start-3 flex justify-end">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border text-sm font-medium shadow-sm hover:opacity-95"
              >
                Edit
              </button>
            ) : (
              <div className="inline-flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium shadow hover:opacity-95 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="px-3 py-2 rounded-md bg-white border text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {loading ? (
            // minimal loading placeholder (UI only)
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-1/3 bg-gray-200 rounded" />
              <div className="h-6 w-1/4 bg-gray-200 rounded" />
              <div className="h-40 bg-gray-200 rounded" />
            </div>
          ) : (
            <div>
              {/* Title: input when editing, otherwise heading */}
              {!isEditing ? (
                <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
                  {note?.title}
                </h1>
              ) : (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-2xl font-extrabold text-gray-900 mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Note title"
                />
              )}

              {/* Content: textarea when editing, otherwise paragraph */}
              {!isEditing ? (
                <p className="text-lg text-gray-600">{note?.content}</p>
              ) : (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={8}
                  className="w-full text-lg text-gray-700 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Note content"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
