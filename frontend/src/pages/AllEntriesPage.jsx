import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEntries } from "../api/journal";
import EntryCard from "../components/EntryCard";

export default function AllEntriesPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch(() => setError("Couldn't load your entries. Try refreshing."))
      .finally(() => setLoading(false));
  }, []);

  const sorted = entries.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page">
      <div className="section-header">
        <h2>All entries</h2>
        <button className="btn btn-primary" onClick={() => navigate("/new")}>
          Write Entry
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <p className="status-text">Loading…</p>
      ) : sorted.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Write your first one.</p>
        </div>
      ) : (
        <div className="entry-grid">
          {sorted.map((entry, i) => (
            <EntryCard entry={entry} index={i} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
}
