'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const heartbeatHandler = require('./endpoints/heartbeatHandler');
const loginHandler = require('./endpoints/loginHandler');
const signupHandler = require('./endpoints/signUpHandler');
const postHandler = require('./endpoints/postHandler');
const userHandler = require('./endpoints/userHandler');
const commentHandler = require('./endpoints/commentHandler');
const friendHandler = require('./endpoints/friendHandler');
const LOCAL_PORT = 8080;
const PORT = process.env.PORT || LOCAL_PORT;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('/heartbeat', heartbeatHandler.heartbeat);

app.post('/api/signup', jsonParser, signupHandler.signup);

app.post('/api/login', jsonParser, loginHandler.login);

app.get('/api/post', postHandler.displayPosts);

app.delete('/api/login', jsonParser, loginHandler.logout);

app.post('/api/post', jsonParser, postHandler.createNewPost);

app.get('/api/user', userHandler.getUserInfo);

app.get('/api/post/:id/comment', commentHandler.findAllComments);

app.post('/api/post/:id/comment', jsonParser, commentHandler.createComment);

app.put('/api/post/:id/like', postHandler.like);

app.put('/api/post/:id/share', postHandler.share);

app.get('/api/friend', friendHandler.getFriendsInfo);

app.get('*', (req, res) =>{
  res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
});

/* eslint no-console: "off" */
app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
