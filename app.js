const express = require('express');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api'));

module.exports = app;
