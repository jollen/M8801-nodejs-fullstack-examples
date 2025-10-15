require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./db');
const v1Routes = require('./routes/v1');

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api/v1', v1Routes);

// 404 for API
app.use('/api', (req, res, next) => { const err = new Error('Not Found'); err.status = 404; next(err); });

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).type('application/problem+json').json({
    type: 'about:blank',
    title: status === 404 ? 'Not Found' : 'Internal Server Error',
    status,
    detail: err.message || 'Unexpected error'
  });
});

connect().then(() => {
  app.listen(port, () => console.log(`Mongo REST listening on :${port}`));
}).catch(err => {
  console.error('[MongoDB] 無法連線：', err);
  process.exit(1);
});
