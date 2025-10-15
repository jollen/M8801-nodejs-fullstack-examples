const express = require('express');
const { createDiscussion, listDiscussions } = require('../../controllers/discussions.controller');
const { validateBody } = require('../../shared/validate');

const router = express.Router();

router.post('/',
  validateBody({ message: 'string|min:1|max:500' }),
  createDiscussion
);

router.get('/', listDiscussions);

module.exports = router;
