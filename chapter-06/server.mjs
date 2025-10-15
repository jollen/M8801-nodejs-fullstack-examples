import http from 'http';
import { URL } from 'url';

const PORT = process.env.PORT || 3000;

/** In-memory storage */
const messages = []; // { id, message, timestamp }

/** Utility: send JSON */
const sendJSON = (res, status, data) => {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
};

/** Utility: send text/html */
const sendHTML = (res, status, html) => {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
};

/** Parse body (supports JSON or text) */
const parseBody = async (req) => {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        // try JSON
        const json = JSON.parse(data);
        return resolve(json);
      } catch {
        // fallback: treat as plain text
        return resolve({ message: data.toString() });
      }
    });
    req.on("error", reject);
  });
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Simple homepage to test API
  if (req.method === "GET" && url.pathname === "/") {
    return sendHTML(res, 200, `<!doctype html>
<html lang="zh-Hant">
<head><meta charset="utf-8"><title>Chapter 6 — Web Service</title></head>
<body>
  <h2>Chapter 6 — Web Service（HTTP 原生模組）</h2>
  <p>此頁面僅做 API 測試用途。請在下方輸入訊息，將以 <code>POST /messages</code> 儲存，右側區塊用 <code>GET /messages</code> 讀取。</p>
  <div style="display:flex; gap:24px;">
    <div>
      <input id="msg" placeholder="輸入訊息..." />
      <button id="send">送出</button>
    </div>
    <div>
      <button id="load">讀取最新 5 筆</button>
      <pre id="out" style="min-width:360px;min-height:160px;border:1px solid #ccc;padding:8px;"></pre>
    </div>
  </div>
<script>
document.getElementById('send').onclick = async () => {
  const msg = document.getElementById('msg').value.trim();
  if (!msg) return;
  const r = await fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });
  const data = await r.json();
  alert('已儲存：' + (data.message || ''));
  document.getElementById('msg').value = '';
};
document.getElementById('load').onclick = async () => {
  const r = await fetch('/messages?limit=5');
  const data = await r.json();
  document.getElementById('out').textContent = JSON.stringify(data, null, 2);
};
</script>
</body></html>`);
  }

  // REST: POST /messages
  if (req.method === "POST" && url.pathname === "/messages") {
    try {
      const body = await parseBody(req);
      const text = (body && body.message ? String(body.message) : "").trim();
      if (!text) return sendJSON(res, 400, { error: "message is required" });
      const item = { id: messages.length + 1, message: text, timestamp: Date.now() };
      messages.push(item);
      return sendJSON(res, 201, { id: item.id, message: item.message, timestamp: item.timestamp });
    } catch (e) {
      console.error(e);
      return sendJSON(res, 500, { error: "internal error" });
    }
  }

  // REST: GET /messages?limit=10
  if (req.method === "GET" && url.pathname === "/messages") {
    const limit = Math.max(1, Math.min(100, parseInt(url.searchParams.get("limit") || "10", 10)));
    const data = messages.slice(-limit).reverse();
    return sendJSON(res, 200, data);
  }

  // Method not allowed / not found
  if (url.pathname.startsWith("/messages")) {
    res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify({ error: "method not allowed" }));
  }
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on :${PORT}`);
});
