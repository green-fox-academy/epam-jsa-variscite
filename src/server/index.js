'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/heartbeat', (req, res) => {
  let MongoClient = mongodb.MongoClient;
  let url = process.env.DB_URL;
  MongoClient.connect(url, function(err, db) {
    let adminDb = db.admin();
    adminDb.serverStatus(function(err, info) {
      console.log(info.version);
      res.json(info.version);
      db.close();
    });
  });
});

app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

/* eslint no-console: "off" */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
