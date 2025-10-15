const express = require('express');
const { createDiscussion, listDiscussions } = require('../../controllers/discussions.controller');

const router = express.Router();
router.post('/', createDiscussion);
router.get('/', listDiscussions);

module.exports = router;
