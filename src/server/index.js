'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const heartbeatHandler = require('./endpoints/heartbeatHandler');
const loginHandler = require('./endpoints/loginHandler');
const signupHandler = require('./endpoints/signUpHandler');
const LOCAL_PORT = 8080;
const PORT = process.env.PORT || LOCAL_PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/heartbeat', heartbeatHandler.heartbeat);

app.post('/api/signup', jsonParser, signupHandler.signup);

app.post('/api/login', jsonParser, loginHandler.login);

app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

/* eslint no-console: "off" */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
