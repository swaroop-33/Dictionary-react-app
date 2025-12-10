// Vercel Serverless Function: proxy for Pexels API
export default async function handler(req, res) {
  try {
    const { query = "", per_page = "8" } = req.query || {};
    const key = process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY;

    if (!key) return res.status(500).json({ error: "Missing PEXELS_API_KEY in Vercel env" });
    if (!query) return res.status(400).json({ error: "Missing 'query' param" });

    const upstream = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${encodeURIComponent(per_page)}`,
      { headers: { Authorization: key } }
    );

    const text = await upstream.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(upstream.status).send(text);
  } catch (err) {
    res.status(500).json({ error: "Pexels proxy failed", detail: String(err) });
  }
}
