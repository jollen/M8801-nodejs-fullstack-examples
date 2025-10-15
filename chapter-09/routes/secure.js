const express = require('express');
const router = express.Router();

// 受保護首頁
router.get('/', (req, res) => {
  res.render('secure', { title: '受保護區', message: '你已通過驗證，歡迎進入。' });
});

// JSON 資源
router.get('/profile', (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, role: req.user.role });
});

// 範例：觸發錯誤交給錯誤中介層
router.get('/boom', (req, res, next) => {
  const err = new Error('Something went wrong');
  err.status = 500;
  next(err);
});

module.exports = router;
