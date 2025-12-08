export default function ImagesGrid({ photos = [] }) {
  if (!photos.length) return null;
  return (
    <div className="grid grid-4">
      {photos.map((p) => (
        <a key={p.id} href={p.url} target="_blank" rel="noreferrer" style={{ display: "block" }}>
          <img
            src={p.src?.medium || p.src?.small}
            alt={p.alt || "related"}
            style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border)" }}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}
