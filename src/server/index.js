'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const loginHandler = require('./loginHandler');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

const errorHandle = require('./signUpErrorHandler');
const database = require('./signUpDatabase');

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

app.post('/api/login', jsonParser, loginErrorHandle.login);

/* eslint no-console: "off" */
app.post('/api/signup', jsonParser, function(req, res) {
  let username = req.body.username || '';
  let phonenumber = req.body.phonenumber || '';
  let fullname = req.body.fullname || '';
  let encrypted = cryptr.encrypt(req.body.password);
  let user = {
    username: username,
    email: req.body.email,
    phonenumber: phonenumber,
    fullname: fullname,
    password: encrypted,
  };
  if (errorHandle.signUpErrorHandler(req, res)) {
    database.signUp(user, res);
  }
});

/* eslint no-console: 'off' */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
