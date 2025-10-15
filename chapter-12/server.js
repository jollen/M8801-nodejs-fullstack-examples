const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4100;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => console.log(`Chapter-12 Backbone client on :${port}`));
