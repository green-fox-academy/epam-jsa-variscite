const db = require('./loginDatabase');

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
    return;
  }
  console.log(password);
  db.checkUserInfo(email, password, res);

}

module.exports= {
  login: login,
};
