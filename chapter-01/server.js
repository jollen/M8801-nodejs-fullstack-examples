const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4101;
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')));
app.listen(port, () => console.log(`Chapter-01 static playground on :${port}`));
