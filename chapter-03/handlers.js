const { URLSearchParams } = require('url');

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type + '; charset=utf-8' });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); }
      catch { resolve({ raw: data.toString() }); }
    });
    req.on('error', reject);
  });
}

// GET /
function home(req, res) {
  const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>Chapter 3 — Routing</title></head>
<body style="font-family:system-ui, -apple-system, 'Noto Sans TC', sans-serif; max-width:820px; margin:24px auto">
  <h2>Chapter 3 — URL Routing（純 Node.js）</h2>
  <ul>
    <li><a href="/hello?name=Jollen">/hello?name=Jollen</a></li>
    <li><a href="/time">/time</a></li>
  </ul>
  <p>POST /echo 範例：</p>
  <pre id="out" style="min-height:120px;border:1px solid #ddd;padding:8px;background:#fafafa"></pre>
  <script>
    fetch('/echo', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ demo:true, msg:'hi' })})
      .then(r=>r.json()).then(d => document.getElementById('out').textContent = JSON.stringify(d,null,2));
  </script>
</body></html>`;
  send(res, 200, 'text/html', html);
}

// GET /hello?name=xxx
function hello(req, res) {
  const name = req._parsedUrl?.query?.name || 'World';
  send(res, 200, 'text/plain', `Hello, ${name}`);
}

// GET /time
function time(req, res) {
  send(res, 200, 'text/plain', new Date().toISOString());
}

// POST /echo
async function echo(req, res) {
  const body = await parseBody(req);
  send(res, 201, 'application/json', JSON.stringify({ ok: true, body }));
}

module.exports = { home, hello, time, echo };
