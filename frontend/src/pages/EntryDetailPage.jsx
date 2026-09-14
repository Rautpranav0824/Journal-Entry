import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEntry, getEntry } from "../api/journal";
import { formatDate } from "../utils/formatDate";
import ConfirmModal from "../components/ConfirmModal";

export default function EntryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    getEntry(id)
      .then(setEntry)
      .catch(() => setError("Couldn't load that entry."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    try {
      await deleteEntry(id);
      navigate("/entries");
    } catch (err) {
      setError("Couldn't delete this entry.");
      setShowDeleteConfirm(false);
    }
  }

  if (loading) {
    return (
      <div className="page">
        <p className="status-text">Loading…</p>
      </div>
    );
  }

  if (error && !entry) {
    return (
      <div className="page">
        <div className="form-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page">
      {error && <div className="form-error">{error}</div>}

      <div className="entry-detail-date">{formatDate(entry.date)}</div>
      <h1 className="entry-detail-title">{entry.title}</h1>
      <p className="entry-detail-content">{entry.content}</p>

      <div className="entry-detail-actions">
        <button className="btn btn-outline" onClick={() => setShowEditConfirm(true)}>
          Edit
        </button>
        <button className="btn btn-danger-outline" onClick={() => setShowDeleteConfirm(true)}>
          Delete
        </button>
      </div>

      <ConfirmModal
        open={showEditConfirm}
        title="Change this entry?"
        message="You really wanna change the entry? You can always write a new entry to tell the story — memories shouldn't be changed."
        confirmLabel="Edit"
        cancelLabel="Cancel"
        onConfirm={() => navigate(`/entries/${id}/edit`)}
        onCancel={() => setShowEditConfirm(false)}
      />

      <ConfirmModal
        open={showDeleteConfirm}
        title="Delete this entry?"
        message="You really wanna delete it? This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
