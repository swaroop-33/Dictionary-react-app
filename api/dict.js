// Serverless proxy for Free Dictionary API
export default async function handler(req, res) {
  try {
    const { word = "" } = req.query || {};
    if (!word) {
      res.status(400).json({ error: "Missing 'word' query param" });
      return;
    }

    const upstream = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    const text = await upstream.text(); // pass-through
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(upstream.status).send(text);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Dictionary proxy failed", detail: String(err) });
  }
}
