import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import AllEntriesPage from "./pages/AllEntriesPage";
import EntryDetailPage from "./pages/EntryDetailPage";
import JournalEditorPage from "./pages/JournalEditorPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <div className="app-panel">
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <LandingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/entries"
                element={
                  <ProtectedRoute>
                    <AllEntriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/entries/:id"
                element={
                  <ProtectedRoute>
                    <EntryDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/entries/:id/edit"
                element={
                  <ProtectedRoute>
                    <JournalEditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new"
                element={
                  <ProtectedRoute>
                    <JournalEditorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
