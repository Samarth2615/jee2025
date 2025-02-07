export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const html = await response.text();
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",  // Allow all websites
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      });
    } catch (error) {
      return new Response("Error fetching URL: " + error.message, { status: 500 });
    }
  },
};
