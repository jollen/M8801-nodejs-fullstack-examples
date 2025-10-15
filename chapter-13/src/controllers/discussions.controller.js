const service = require('../services/discussions.service');
const { withCacheHeaders } = require('../shared/respond');

async function createDiscussion(req, res, next) {
  try {
    const { user, message } = req.body || {};
    const item = await service.create({ user, message });
    res.status(201).json(item);
  } catch (e) { next(e); }
}

async function listDiscussions(req, res, next) {
  try {
    const limit = req.query.limit;
    const skip = req.query.skip;
    const data = await service.latest(limit, skip);
    const last = data[0]?.timestamp || Date.now();
    const payload = JSON.stringify(data);
    withCacheHeaders(res, payload, last);
    res.status(200).type('application/json').send(payload);
  } catch (e) { next(e); }
}

module.exports = { createDiscussion, listDiscussions };
