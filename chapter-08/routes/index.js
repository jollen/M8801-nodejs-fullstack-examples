const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Chapter 8 — Express.js × Pug',
    subtitle: 'URL Routing・View Engine・Error Middleware',
  });
});

module.exports = router;
