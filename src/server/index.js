'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const errorHandle = require('./signUpErrorHandle');
const database = require('./database');

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

app.post('/api/signup', jsonParser, function(req, res) {
  let userName = req.body.userName || '';
  let phoneNumber = req.body.phoneNumber || '';
  let fullName = req.body.fullName || '';
  let encrypted = req.body.password;
  console.log(encrypted);
	let user = {
    userName: userName,
    email: req.body.email,
    phoneNumber: phoneNumber,
    fullName: fullName,
    password: req.body.password
	};
	if(errorHandle.signUpErrorHandle(req, res) !== true){
    database.signUp(user, res);
  };
});


/* eslint no-console: 'off' */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
