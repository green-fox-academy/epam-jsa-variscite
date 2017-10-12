'use strict';

const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

function signUpErrorHandle(req, res) {
  let statusCode = 201;
  let errDescripton = {errorType: 'ok'};
  let errorExists = false;
  if(req.headers['content-type'] !== 'application/json') {
    statusCode = 400;
    errDescripton = {errorType:'contentType'};
    errorExists = true;
  } else if (req.body.email.length === 0){
    statusCode = 400;
    errDescripton = {errorType:'missingEmail'};
    errorExists = true;
  } else if (req.body.password.length === 0){
    statusCode = 400;
    errDescripton = {errorType:'missingPassword'};
    errorExists = true;
  } else if (req.body.email.length !== 0 && !emailRe.test(req.body.email)){
    statusCode = 400;
    errDescripton = {errorType:'emailWrong'};
    errorExists = true;
  } else if (req.body.password.length < 8 && req.body.password.length !== 0){
    statusCode = 400;
    errDescripton = {errorType:'passwordWrong'};
    errorExists = true;
  }
  res.status(statusCode).json(errDescripton);
  return errorExists;
}

module.exports = {
  signUpErrorHandle: signUpErrorHandle,
};
