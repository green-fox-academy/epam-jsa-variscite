'use strict';
/* eslint max-len: 'off' */
const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const database = require('../collections/usersDatabase');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

function signUpErrorHandler(req, res) {
  let canPass = true;
  if (req.headers['content-type'] !== 'application/json') {
    canPass = false;
    res.status(400).json({errorType: 'contentType'});
  } else if (req.body.email.length === 0) {
    canPass = false;
    res.status(400).json({errorType: 'missingEmail'});
  } else if (req.body.password.length === 0) {
    canPass = false;
    res.status(400).json({errorType: 'missingPassword'});
  } else if (req.body.email.length !== 0 && !emailRe.test(req.body.email)) {
    canPass = false;
    res.status(400).json({errorType: 'emailWrong'});
  } else if (req.body.password.length < 8 && req.body.password.length !== 0) {
    canPass = false;
    res.status(400).json({errorType: 'passwordWrong'});
  }
  return canPass;
}

function signup(req, res) {
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
  if (signUpErrorHandler(req, res)) {
    database.signUp(user, res);
  }
}

module.exports = {
  signup: signup,
};
