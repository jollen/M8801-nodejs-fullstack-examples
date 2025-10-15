const crypto = require('crypto');

function etagOf(str) {
  return 'W/"' + crypto.createHash('sha1').update(String(str)).digest('hex').slice(0, 16) + '"';
}
function withCacheHeaders(res, payload, lastModified) {
  res.setHeader('Cache-Control', 'no-store');
  if (lastModified) res.setHeader('Last-Modified', new Date(lastModified).toUTCString());
  res.setHeader('ETag', etagOf(payload));
}
module.exports = { withCacheHeaders };
