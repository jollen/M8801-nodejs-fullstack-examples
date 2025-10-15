const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const v1Routes = require('./routes/v1');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client')));

// API v1
app.use('/api/v1', v1Routes);

// 404 for API only (let static handle its own 404 by browser)
app.use('/api', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const problem = {
    type: 'about:blank',
    title: err.title || (status === 404 ? 'Not Found' : 'Internal Server Error'),
    status,
    detail: err.message || 'Unexpected error'
  };
  res.status(status).type('application/problem+json').json(problem);
});

app.listen(port, () => console.log(`REST v1 listening on :${port}`));
