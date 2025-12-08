function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

export default function SynAnt({ meanings = [] }) {
  const synonyms = [...new Set(meanings.flatMap(m => m.synonyms || []))].slice(0, 24);
  const antonyms = [...new Set(meanings.flatMap(m => m.antonyms || []))].slice(0, 24);

  if (!synonyms.length && !antonyms.length) return null;

  return (
    <div className="grid grid-2" style={{ marginTop: 12 }}>
      <div className="card">
        <div className="section-title">Synonyms</div>
        <div className="chips">
          {synonyms.length ? synonyms.map((s, i) => <Chip key={i}>{s}</Chip>) : <span style={{ color: "var(--muted)" }}>—</span>}
        </div>
      </div>
      <div className="card">
        <div className="section-title">Antonyms</div>
        <div className="chips">
          {antonyms.length ? antonyms.map((a, i) => <Chip key={i}>{a}</Chip>) : <span style={{ color: "var(--muted)" }}>—</span>}
        </div>
      </div>
    </div>
  );
}
