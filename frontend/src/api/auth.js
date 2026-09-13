import client from "./client";

// POST /public/signup — backend returns the created user (no password field).
export async function signup(userName, password) {
  const response = await client.post("/public/signup", { userName, password });
  return response.data;
}

// POST /public/login — backend returns the JWT as a plain string body,
// not a JSON object, so we just hand back response.data as-is.
export async function login(userName, password) {
  const response = await client.post("/public/login", { userName, password });
  return response.data;
}
