'use strict';

const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function signUpErrorHandle(req, res) {
  let errorExists = false;
  if(req.headers['content-type'] !== 'application/json') {
    errorExists = true;
    res.status(400).json({errorType:'contentType'});
  } else if (req.body.email.length === 0){
    errorExists = true;
    res.status(400).json({errorType:'missingEmail'});
  } else if (req.body.password.length === 0){
    errorExists = true;
    res.status(400).json({errorType:'missingPassword'});
  } else if (req.body.email.length !== 0 && !emailRe.test(req.body.email)){
    errorExists = true;
    res.status(400).json({errorType:'emailWrong'});
  } else if (req.body.password.length < 8 && req.body.password.length !== 0){
    errorExists = true;
    res.status(400).json({errorType:'passwordWrong'});
  }
  return errorExists;
}

module.exports = {
  signUpErrorHandle: signUpErrorHandle,
};