import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEntry, getEntry, updateEntry } from "../api/journal";

export default function JournalEditorPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    getEntry(id)
      .then((entry) => {
        setTitle(entry.title || "");
        setContent(entry.content || "");
      })
      .catch(() => setError("Couldn't load that entry."))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (isEditing) {
        await updateEntry(id, title, content);
        navigate(`/entries/${id}`);
      } else {
        const created = await createEntry(title, content);
        navigate(created?.id ? `/entries/${created.id}` : "/entries");
      }
    } catch (err) {
      setError("Couldn't save this entry. Try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (isEditing) {
      navigate(`/entries/${id}`);
    } else {
      navigate("/");
    }
  }

  if (loading) {
    return (
      <div className="page">
        <p className="status-text">Loading…</p>
      </div>
    );
  }

  return (
    <div className="page">
      {error && <div className="form-error">{error}</div>}

      <input
        className="editor-title-input"
        placeholder="Entry title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="editor-content-input"
        placeholder="Write what's on your mind…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="editor-actions">
        <button className="btn btn-ghost" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? "Saving…" : "Save entry"}
        </button>
      </div>
    </div>
  );
}
