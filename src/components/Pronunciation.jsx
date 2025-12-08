export default function Pronunciation({ phonetics = [] }) {
  if (!phonetics.length) return null;

  const firstAudio = phonetics.find(p => p.audio);
  const text = phonetics.find(p => p.text)?.text || "";

  return (
    <div className="pron" aria-live="polite">
      {text && <span style={{ color: "var(--muted)" }}>{text}</span>}
      {firstAudio?.audio && (
        <button
          className="play"
          title="Play pronunciation"
          onClick={() => new Audio(firstAudio.audio).play()}
        >
          🔊 Listen
        </button>
      )}
    </div>
  );
}
