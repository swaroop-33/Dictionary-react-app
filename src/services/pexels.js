// src/services/pexels.js
const PEXELS_URL = "https://api.pexels.com/v1/search";

export async function fetchImages(query, perPage = 8) {
  const key = (import.meta.env.VITE_PEXELS_API_KEY || "").trim();
  if (!key) {
    console.warn("[Pexels] Missing API key. Check your .env file.");
    return { photos: [] };
  }

  const res = await fetch(
    `${PEXELS_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}`,
    { headers: { Authorization: key } }
  );

  if (!res.ok) {
    console.error("[Pexels] Error:", res.status, res.statusText);
    return { photos: [] };
  }

  const data = await res.json();
  return data;
}
