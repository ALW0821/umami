import fetch from "node-fetch";

export async function handler() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/keepalive`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal" // keeps response small
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Supabase error: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: "Keepalive ping inserted ✅",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Keepalive failed ❌: ${error.message}`,
    };
  }
}

