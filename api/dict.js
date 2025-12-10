// Vercel Serverless Function: proxy for Free Dictionary API
export default async function handler(req, res) {
  try {
    const { word = "" } = req.query || {};
    if (!word) return res.status(400).json({ error: "Missing 'word' query param" });

    const upstream = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );

    const text = await upstream.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(upstream.status).send(text);
  } catch (err) {
    res.status(500).json({ error: "Dictionary proxy failed", detail: String(err) });
  }
}
