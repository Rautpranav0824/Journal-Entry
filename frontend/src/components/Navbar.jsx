import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        Marginalia
      </Link>
      {isAuthenticated && (
        <div className="nav-actions">
          <Link to="/new" className="nav-link">
            New entry
          </Link>
          <button className="nav-link" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
