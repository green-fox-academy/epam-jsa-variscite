const db = require('./loginDatabase');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('jiaMi');

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let email = req.body.email;
  let password = req.body.password;
  let status = 200;
  let contentType = req.headers['content-type'].toLowerCase();
  let obj = {};
  if (email === '' || password === '') {
    obj = {'errorType': 'FieldMissing'};
    status = 400;
  } else if (contentType !== 'application/json') {
    obj = {'errorType': 'ContentType'};
    status = 400;
  }

  if (status !== 200) {
    res.status(status).json(obj);
  } else {
    let result = db.getUserInfo(email);
    let encrypted = cryptr.encrypt(password);
    console.log(encrypted);
    console.log(result);
    if (result !== encrypted || result === undefined) {
      obj = {'errorType': 'MisMatch'};
    status = 403;
    } else if (result === encrypted) {
      obj = {'msg': 'success'};
    }
    res.status(status).json(obj);
  }

}

module.exports= {
  login: login,
};
