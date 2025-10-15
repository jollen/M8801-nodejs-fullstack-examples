const express = require('express');
const router = express.Router();

// In-memory store
const posts = [
  { id: 1, title: 'Hello Express', body: 'Express 很好用。' },
  { id: 2, title: '關於 Pug', body: 'Pug 是 Jade 的後繼版本。' },
];

router.get('/', (req, res) => {
  res.render('posts', { title: '貼文列表', posts });
});

router.post('/', (req, res, next) => {
  try {
    const title = String(req.body.title || '').trim();
    const body = String(req.body.body || '').trim();
    if (!title || !body) {
      const err = new Error('title 和 body 為必填');
      err.status = 400;
      throw err;
    }
    const item = { id: posts.length + 1, title, body };
    posts.push(item);
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
