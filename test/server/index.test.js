const assert = require('assert');
const supertest = require('supertest');
const server = supertest.agent('http://localhost:8080');

describe('missingEmail error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': 'aliceShen12345',
        'email': '',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.errorType, 'missingEmail');
        done();
      });
  });
});

describe('missingPassword error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227@yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': '',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.errorType, 'missingPassword');
        done();
      });
  });
});

describe('emailWrong error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.errorType, 'emailWrong');
        done();
      });
  });
});

describe('passwordWrong error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227@yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwwe',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.errorType, 'passwordWrong');
        done();
      });
  });
});

describe('emailError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227@hotmail.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 409);
        assert.equal(res.body.errorType, 'emailError');
        done();
      });
  });
});

describe('success test with all fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '1234',
        'email': 'aliceshen227@11.com',
        'phonenumber': '444444444',
        'fullname': 'Alice Shen',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 201);
        done();
      });
  });
});

describe('success test with some optional fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': 'op',
        'email': 'aliceshen227@22.com',
        'phonenumber': '',
        'fullname': 'Alice Shen',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 201);
        done();
      });
  });
});

describe('success test with no optional fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227@44.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 201);
        done();
      });
  });
});

describe('usernameError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': 'aliceShen12345',
        'email': 'aliceshen227@epam.edu',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 409);
        assert.equal(res.body.errorType, 'usernameError');
        done();
      });
  });
});

describe('phoneError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({'username': '',
        'email': 'aliceshen227@epam11.edu',
        'phonenumber': '223222222',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        assert.equal(res.status, 409);
        assert.equal(res.body.errorType, 'phoneError');
        done();
      });
  });
});
