const USE_PROXY = typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app");

export async function fetchImages(query, perPage = 8) {
  if (USE_PROXY) {
    const res = await fetch(`/api/pexels?query=${encodeURIComponent(query)}&per_page=${perPage}`);
    if (!res.ok) return { photos: [] };
    return res.json();
  }

  // Local dev: call Pexels directly with your Vite env key
  const key = (import.meta.env.VITE_PEXELS_API_KEY || "").trim();
  if (!key) {
    console.warn("[Pexels] Missing API key. Check your .env (VITE_PEXELS_API_KEY).");
    return { photos: [] };
  }

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
    { headers: { Authorization: key } }
  );
  if (!res.ok) return { photos: [] };
  return res.json();
}
