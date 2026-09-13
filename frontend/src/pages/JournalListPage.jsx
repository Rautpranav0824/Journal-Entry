import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEntries } from "../api/journal";

// Spring can send LocalDateTime either as an ISO string or as a
// [year, month, day, hour, minute, second] array depending on Jackson
// config, so handle both instead of assuming one shape.
function formatDate(date) {
  if (!date) return "";
  const d = Array.isArray(date)
    ? new Date(date[0], date[1] - 1, date[2], date[3] || 0, date[4] || 0)
    : new Date(date);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function JournalListPage() {
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

  return (
    <div className="page">
      <div className="list-header">
        <h1>Your entries</h1>
        <button className="btn btn-primary" onClick={() => navigate("/new")}>
          New entry
        </button>
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <p className="status-text">Loading…</p>
      ) : entries.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Write your first one.</p>
        </div>
      ) : (
        entries
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((entry) => (
            <div className="entry-row" key={entry.id} onClick={() => navigate(`/entries/${entry.id}`)}>
              <div>
                <div className="entry-date">{formatDate(entry.date)}</div>
                <div className="entry-title">{entry.title}</div>
                <div className="entry-preview">{entry.content}</div>
              </div>
            </div>
          ))
      )}
    </div>
  );
}
