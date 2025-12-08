import Pronunciation from "./Pronunciation";
import Meanings from "./Meanings";
import SynAnt from "./SynAnt";

export default function WordResult({ entry }) {
  if (!entry) return null;
  const { word, phonetics = [], meanings = [] } = entry;

  return (
    <div>
      <h2 className="section-title" style={{ fontSize: 24 }}>{word}</h2>
      <Pronunciation phonetics={phonetics} />
      <div className="grid" style={{ gap: 16, marginTop: 12 }}>
        <Meanings meanings={meanings} />
        <SynAnt meanings={meanings} />
      </div>
    </div>
  );
}
