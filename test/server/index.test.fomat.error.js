'use strict';

const assert = require('assert');
const supertest = require('supertest');
const server = supertest.agent('http://localhost:8080');
const HTTP_STATUSES = require('../../server/modules/httpStatuses');

describe('missingEmail error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': 'aliceShen12345',
        'email': '',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.BAD_REQUEST);
        assert.equal(res.body.errorType, 'missingEmail');
        done();
      });
  });
});

describe('missingPassword error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227@yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': '',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.BAD_REQUEST);
        assert.equal(res.body.errorType, 'missingPassword');
        done();
      });
  });
});

describe('emailWrong error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.BAD_REQUEST);
        assert.equal(res.body.errorType, 'emailWrong');
        done();
      });
  });
});

describe('passwordWrong error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227@yahoo.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwwe',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.BAD_REQUEST);
        assert.equal(res.body.errorType, 'passwordWrong');
        done();
      });
  });
});

describe('emailError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227@hotmail.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.CONFLICT);
        assert.equal(res.body.errorType, 'emailError');
        done();
      });
  });
});
