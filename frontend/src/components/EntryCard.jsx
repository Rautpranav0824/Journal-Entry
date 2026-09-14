import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const COLORS = ["var(--card-1)", "var(--card-2)", "var(--card-3)", "var(--card-4)"];

export default function EntryCard({ entry, index }) {
  const navigate = useNavigate();
  const color = COLORS[index % COLORS.length];

  return (
    <div
      className="entry-card"
      style={{ background: color }}
      onClick={() => navigate(`/entries/${entry.id}`)}
    >
      <span className="dots">⋯</span>
      <div className="entry-card-title">{entry.title}</div>
      <div className="entry-card-date">{formatDate(entry.date)}</div>
    </div>
  );
}
