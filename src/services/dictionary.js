const PUBLIC_BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";
const USE_PROXY = typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app");

export async function fetchWord(word) {
  const url = USE_PROXY
    ? `/api/dict?word=${encodeURIComponent(word)}`
    : `${PUBLIC_BASE}/${encodeURIComponent(word)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Word not found");
  return res.json();
}
