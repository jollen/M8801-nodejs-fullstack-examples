const service = require('../services/discussions.service');
const { withCacheHeaders, negotiate } = require('../shared/respond');

async function createDiscussion(req, res, next) {
  try {
    const { message } = req.body || {};
    const item = await service.create({ message });
    res.status(201).json(item);
  } catch (e) { next(e); }
}

async function listDiscussions(req, res, next) {
  try {
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10', 10)));
    const data = await service.latest(limit);
    const last = data[0]?.timestamp || Date.now();
    const format = negotiate(req);

    if (format === 'text') {
      const payload = data.map(x => `[${new Date(x.timestamp).toISOString()}] ${x.message}`).join('\n');
      withCacheHeaders(res, payload, last);
      res.status(200).type('text/plain; charset=utf-8').send(payload + '\n');
    } else {
      const payload = JSON.stringify(data);
      withCacheHeaders(res, payload, last);
      res.status(200).type('application/json').send(payload);
    }
  } catch (e) { next(e); }
}

module.exports = { createDiscussion, listDiscussions };
