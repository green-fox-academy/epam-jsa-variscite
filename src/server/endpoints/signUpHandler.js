'use strict';
/* eslint max-len: 'off' */

const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const database = require('../collections/usersDatabase');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');
const HTTP_STATUSES = require('../modules/httpStatuses');
const EMPTY_LENGTH = 0;
const MIN_LENGTH = 8;

function missingEmailHandler(canPas, res) {
  let canPa = canPas;

  canPa = false;
  res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'missingEmail'});
  return canPa;
}

function missingUsernameHandler(canPas, res) {
  let canPa = canPas;

  canPa = false;
  res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'missingUsername'});
  return canPa;
}

function missingPasswordHandler(canPas, res) {
  let canPa = canPas;

  canPa = false;
  res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'missingPassword'});
  return canPa;
}

function emailWrongHandler(canPas, res) {
  let canPa = canPas;

  canPa = false;
  res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'emailWrong'});
  return canPa;
}

function fieldErrorHandler(req, res, canPass) {
  let canPas = canPass;

  if (req.body.email.length === EMPTY_LENGTH) {
    missingEmailHandler(canPas, res);
  } else if (req.body.username.length === EMPTY_LENGTH) {
    missingUsernameHandler(canPas, res);
  } else if (req.body.password.length === EMPTY_LENGTH) {
    missingPasswordHandler(canPas, res);
  } else if (req.body.email.length !== EMPTY_LENGTH && !emailRe.test(req.body.email)) {
    emailWrongHandler(canPas, res);
  }
  return canPas;
}

function signUpErrorHandler(req, res) {
  let canPass = true;

  if (req.headers['content-type'] !== 'application/json') {
    canPass = false;
    res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'contentType'});
  } else if (req.body.password.length < MIN_LENGTH && req.body.password.length !== EMPTY_LENGTH) {
    canPass = false;
    res.status(HTTP_STATUSES.BAD_REQUEST).json({errorType: 'passwordWrong'});
  } else {
    fieldErrorHandler(req, res, canPass);
  }
  return canPass;
}

function signup(req, res) {
  let username = req.body.username;
  let phonenumber = req.body.phonenumber || '';
  let fullname = req.body.fullname || '';
  let encrypted = cryptr.encrypt(req.body.password);
  let user = {
    username: username,
    email: req.body.email,
    phonenumber: phonenumber,
    fullname: fullname,
    password: encrypted,
    userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',

  };

  if (signUpErrorHandler(req, res)) {
    database.signUp(user, req, res);
  }
}

module.exports = {signup: signup};
