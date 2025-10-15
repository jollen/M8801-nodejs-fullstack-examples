const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4200;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API
app.get('/api/time', (req, res) => {
  res.json({ now: new Date().toISOString() });
});
app.post('/api/echo', (req, res) => {
  res.json({ ok: true, body: req.body ?? null });
});

// Static
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => console.log(`HTML5 Runtime server on :${port}`));
