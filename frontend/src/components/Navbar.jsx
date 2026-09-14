import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function linkClass(path) {
    return location.pathname === path ? "nav-link active" : "nav-link";
  }

  return (
    <nav className="nav">
      <Link to={isAuthenticated ? "/" : "/login"} className="nav-brand">
        Marginalia
      </Link>

      {isAuthenticated && (
        <div className="nav-links">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/entries" className={linkClass("/entries")}>
            All entries
          </Link>
          <Link to="/profile" className={linkClass("/profile")}>
            Profile
          </Link>
        </div>
      )}

      <div className="nav-actions">
        {isAuthenticated ? (
          <button className="btn btn-outline" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
