import fetch from "node-fetch";

export default async (req, context) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    const res = await fetch(`${SUPABASE_URL}/rest/v1/?select=now()`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Supabase ping failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("Supabase keepalive ping successful:", data);

    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Keepalive error:", err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
