import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import WordResult from "./components/WordResult";
import ImagesGrid from "./components/ImagesGrid";
import { fetchWord } from "./services/dictionary";
import { fetchImages } from "./services/pexels";
import "./index.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [entry, setEntry] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [dark, setDark] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dark-pref") || "true"); } catch { return true; }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("dark-pref", JSON.stringify(dark));
  }, [dark]);

  // Press "/" to focus search
  useEffect(() => {
    const onKey = (e) => { if (e.key === "/") { e.preventDefault(); inputRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function search(word) {
    try {
      setLoading(true);
      setErr("");
      setEntry(null);
      setPhotos([]);

      const [dict] = await fetchWord(word);
      setEntry(dict);

      const imgRes = await fetchImages(word, 8);
      setPhotos(imgRes.photos || []);
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { search("serendipity"); }, []);

  const hasImages = photos && photos.length > 0;

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div className="brand">
            <h1>Dictionary React App</h1>
            <p>Definitions · Examples · Synonyms · Antonyms · Pronunciation · Images</p>
          </div>
          <button className="toggle" onClick={() => setDark(d => !d)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div className="container">
        <div className="search-row">
          <SearchBar
            inputRef={inputRef}
            onSearch={(w) => { setQuery(w); search(w); }}
            loading={loading}
          />
        </div>

        {loading && (<><div className="skel"></div><div className="skel" style={{ marginTop: 12 }}></div></>)}

        {err && !loading && (
          <div className="error">
            {err === "Word not found" ? `No results for “${query}”. Try another word.` : err}
          </div>
        )}

        {!loading && !err && entry && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <WordResult entry={entry} />
            </div>

            {hasImages ? (
              <div className="card" style={{ marginTop: 16 }}>
                <h3 className="section-title">Related Images</h3>
                <ImagesGrid photos={photos} />
              </div>
            ) : (
              <div className="empty" style={{ marginTop: 16 }}>
                No related images found for “{entry?.word}”.
              </div>
            )}
          </>
        )}

        <div className="footer">
          Tip: press <kbd>/</kbd> to focus search • Built with Free Dictionary API & Pexels
        </div>
      </div>
    </>
  );
}
