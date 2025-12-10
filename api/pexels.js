// Edge Function: proxy Pexels API
export const config = { runtime: "edge" };

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const query = (url.searchParams.get("query") || "").trim();
    const perPage = url.searchParams.get("per_page") || "8";

    const key = process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: "Missing PEXELS_API_KEY in Vercel env" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
    if (!query) {
      return new Response(JSON.stringify({ error: "Missing 'query' param" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const upstream = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${encodeURIComponent(perPage)}`,
      { headers: { Authorization: key } }
    );

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Pexels proxy failed", detail: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
    });
  }
}
