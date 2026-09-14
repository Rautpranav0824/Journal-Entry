import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEntries } from "../api/journal";
import { useAuth } from "../context/AuthContext";
import EntryCard from "../components/EntryCard";

export default function LandingPage() {
  const { username } = useAuth();
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

  const recent = entries
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className="page">
      <div className="hero">
        <span className="hero-badge hero-badge-1" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 3.5l6 6L8 22H2v-6L14.5 3.5z" />
            <path d="M12.5 5.5l6 6" />
          </svg>
        </span>
        <span className="hero-badge hero-badge-2" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1" />
            <path d="M2 8h16v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <path d="M6 2v3M10 2v3M14 2v3" />
          </svg>
        </span>
        <span className="hero-badge hero-badge-3" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </span>
        <span className="hero-badge hero-badge-4" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" />
          </svg>
        </span>

        <h1>
          Write your daily journal
          <br />
          and revisit it anytime
        </h1>
        <p>
          {username ? `Welcome back, ${username}.` : "Welcome back."} Capture what happened today
          — you'll thank yourself later.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/new")}>
          Write Entry
        </button>
      </div>

      <div className="section-header">
        <h2>Recent entries</h2>
        {entries.length > 0 && (
          <button className="btn btn-ghost" onClick={() => navigate("/entries")}>
            See all entries
          </button>
        )}
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <p className="status-text">Loading…</p>
      ) : recent.length === 0 ? (
        <div className="empty-state">
          <p>No entries yet. Write your first one above.</p>
        </div>
      ) : (
        <div className="entry-grid">
          {recent.map((entry, i) => (
            <EntryCard entry={entry} index={i} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
}
