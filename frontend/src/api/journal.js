import client from "./client";

// GET /journal/entries — the backend returns 404 (not an empty array) when
// the user has no entries yet, so we treat that specific case as "no
// entries" rather than an error.
export async function getEntries() {
  try {
    const response = await client.get("/journal/entries");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function getEntry(id) {
  const response = await client.get(`/journal/id/${id}`);
  return response.data;
}

export async function createEntry(title, content) {
  const response = await client.post("/journal/add", { title, content });
  return response.data;
}

export async function updateEntry(id, title, content) {
  const response = await client.put(`/journal/id/${id}`, { title, content });
  return response.data;
}

export async function deleteEntry(id) {
  await client.delete(`/journal/id/${id}`);
}
