import client from "./client";

// POST /public/signup — backend returns the created user (no password field).
export async function signup(userName, password) {
  const response = await client.post("/public/signup", { userName, password });
  return response.data;
}

// POST /public/login — the deployed backend currently returns a JSON
// object like { "token": "..." }, not a bare string, so pull the token
// field out explicitly instead of assuming response.data IS the token.
export async function login(userName, password) {
  const response = await client.post("/public/login", { userName, password });
  return response.data.token;
}
