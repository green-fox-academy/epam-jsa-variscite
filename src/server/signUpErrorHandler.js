'use strict';
/* eslint max-len: 'off' */
const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

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

module.exports = {
  signUpErrorHandler: signUpErrorHandler,
};
