import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEntries } from "../api/journal";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [entryCount, setEntryCount] = useState(null);

  useEffect(() => {
    getEntries()
      .then((entries) => setEntryCount(entries.length))
      .catch(() => setEntryCount(null));
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initial = username ? username[0].toUpperCase() : "?";

  return (
    <div className="page">
      <div className="profile-panel">
        <div className="profile-avatar">{initial}</div>
        <h1>{username || "Your profile"}</h1>
        <p className="profile-stat">
          {entryCount === null ? "—" : `${entryCount} ${entryCount === 1 ? "entry" : "entries"}`} written so
          far
        </p>
        <button className="btn btn-danger-outline" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
