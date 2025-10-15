const url = require('url');

function route(handle, req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname || '/';
  const method = (req.method || 'GET').toUpperCase();
  const key = method + ' ' + pathname;

  console.log('[router]', method, pathname);

  const handler = handle.get(key);
  if (!handler) {
    // 若有相同 path 不同 method，提示 405
    const hasSamePath = Array.from(handle.keys()).some(k => k.endsWith(' ' + pathname));
    if (hasSamePath) {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Method Not Allowed');
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not Found');
  }

  try {
    // 將 query 與 pathname 帶入
    req._parsedUrl = parsed;
    return handler(req, res);
  } catch (e) {
    console.error('[router error]', e);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
}

exports.route = route;
