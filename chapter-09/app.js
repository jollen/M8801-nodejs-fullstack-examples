const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { authPrompt, authGate, preloadUser } = require('./middlewares/auth');
const secureRouter = require('./routes/secure');

const app = express();
const port = process.env.PORT || 3000;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Global middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', (req, res) => {
  res.render('index', { title: 'Chapter 9 — Middleware 分層', subtitle: '以中介層實作密碼保護與流程邏輯' });
});

// Health
app.get('/healthz', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Auth form (GET) + submit (POST)
app.get('/auth', authPrompt);
app.post('/auth', authPrompt);

// Protected mount: only under /secure apply the route-level chain
app.use('/secure', authGate, preloadUser, secureRouter);

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Central error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const wantsJSON = req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'));
  if (wantsJSON) return res.status(status).json({ error: { status, message: err.message } });
  res.status(status).render('error', { title: 'Error', status, message: err.message });
});

app.listen(port, () => console.log(`Express (middleware) on :${port}`));
