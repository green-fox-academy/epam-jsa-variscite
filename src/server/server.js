'use strict';

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('index.html');
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});