const express = require('express');
const path = require('path');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);

// health check
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 404 handler (no route matched)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler (centralized)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const isJSON = req.headers.accept && req.headers.accept.includes('application/json');

  if (isJSON) {
    return res.status(status).json({
      error: { status, message: err.message || 'Server Error' }
    });
  }

  res.status(status);
  res.render('error', {
    title: 'Error',
    message: err.message,
    status
  });
});

app.listen(port, () => {
  console.log(`Express app listening on :${port}`);
});

module.exports = app;
