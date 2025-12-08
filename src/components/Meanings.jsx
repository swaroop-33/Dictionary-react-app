export default function Meanings({ meanings = [] }) {
  if (!meanings.length) return null;

  return (
    <div className="grid" style={{ gap: 14 }}>
      {meanings.map((m, i) => (
        <div key={i} className="card" style={{ padding: 14 }}>
          <div className="section-title" style={{ textTransform: "capitalize" }}>
            {m.partOfSpeech}
          </div>
          <ol style={{ paddingLeft: 18, display: "grid", gap: 10, margin: 0 }}>
            {(m.definitions || []).map((d, j) => (
              <li key={j}>
                <div className="definition">{d.definition}</div>
                {d.example && <div className="example">e.g., {d.example}</div>}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
