import { createContext, useContext, useState } from "react";
import { login as loginRequest, signup as signupRequest } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [username, setUsername] = useState(() => localStorage.getItem("username"));

  async function login(userName, password) {
    const jwt = await loginRequest(userName, password);
    localStorage.setItem("token", jwt);
    localStorage.setItem("username", userName);
    setToken(jwt);
    setUsername(userName);
  }

  async function signup(userName, password) {
    await signupRequest(userName, password);
    // Signing up doesn't log the user in automatically on the backend,
    // so we log in right after to get a token in one step.
    await login(userName, password);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  }

  const value = {
    isAuthenticated: Boolean(token),
    username,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
