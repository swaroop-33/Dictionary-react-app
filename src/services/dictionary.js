const BASE = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function fetchWord(word) {
  const res = await fetch(`${BASE}/${encodeURIComponent(word)}`);
  if (!res.ok) {
    throw new Error("Word not found");
  }
  return res.json(); // array
}
