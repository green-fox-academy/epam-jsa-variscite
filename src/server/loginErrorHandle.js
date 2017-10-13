const db = require('./loginDatabase');

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');
  let email = req.body.email;
  let password = req.body.password;
  let status = 200;
  let result = db.checkUserInfo(email, password);
  let contentType = req.headers['content-type'].toLowerCase();
  let obj = {};
  if (email === '' || password === '') {
    obj = {'errorType': 'FieldMissing'};
    status = 400;
  } else if (!result) {
    obj = {'errorType': 'MisMatch'};
    status = 403;
  } else if (contentType !== 'application/json') {
    obj = {'errorType': 'ContentType'};
    status = 400;
  } else if (result) {
    obj = {};
  }
  res.status(status).json(obj);
}

module.exports= {
  login: login,
};
