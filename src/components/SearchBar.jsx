import { useState } from "react";

export default function SearchBar({ onSearch, loading, inputRef }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    const q = value.trim();
    if (q) onSearch(q);
  }

  return (
    <form onSubmit={submit} style={{ width: "100%", display: "flex", gap: 10 }}>
      <input
        ref={inputRef}
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search an English word (e.g., ephemeral)"
        aria-label="Search word"
      />
      <button className="btn" disabled={loading}>
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
