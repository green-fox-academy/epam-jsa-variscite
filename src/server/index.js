'use strict';

const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/heartbeat', (req, res) => {
  res.json({status: 'ok'});
});
/* eslint no-console: "off" */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
