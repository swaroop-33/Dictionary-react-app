// Serverless proxy for Pexels API
export default async function handler(req, res) {
  try {
    const { query = "", per_page = "8" } = req.query || {};
    const key = process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY;

    if (!key) {
      res.status(500).json({ error: "Missing PEXELS_API_KEY in Vercel env" });
      return;
    }
    if (!query) {
      res.status(400).json({ error: "Missing 'query' param" });
      return;
    }

    const upstream = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${encodeURIComponent(per_page)}`,
      { headers: { Authorization: key } }
    );

    const text = await upstream.text(); // pass-through
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(upstream.status).send(text);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: "Pexels proxy failed", detail: String(err) });
  }
}
