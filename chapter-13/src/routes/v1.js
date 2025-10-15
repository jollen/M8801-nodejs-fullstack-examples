const express = require('express');
const discussionsRouter = require('./v1/discussions');
const healthRouter = require('./v1/health');
const router = express.Router();
router.use('/discussions', discussionsRouter);
router.use('/healthz', healthRouter);
module.exports = router;
