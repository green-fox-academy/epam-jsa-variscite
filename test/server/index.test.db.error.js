'use strict';

const assert = require('assert');
const supertest = require('supertest');
const server = supertest.agent('http://localhost:8080');
const HTTP_STATUSES = require('../../server/modules/httpStatuses');

describe('success test with all fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '1234',
        'email': 'aliceshen227@11.com',
        'phonenumber': '444444444',
        'fullname': 'Alice Shen',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.CREATED);
        done();
      });
  });
});

describe('success test with some optional fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': 'op',
        'email': 'aliceshen227@22.com',
        'phonenumber': '',
        'fullname': 'Alice Shen',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.CREATED);
        done();
      });
  });
});

describe('success test with no optional fields filled', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227@44.com',
        'phonenumber': '',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.CREATED);
        done();
      });
  });
});

describe('usernameError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': 'aliceShen12345',
        'email': 'aliceshen227@epam.edu',
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
        assert.equal(res.body.errorType, 'usernameError');
        done();
      });
  });
});

describe('phoneError error test', function() {
  it('Signup success', function(done) {
    server
      .post('/api/signup')
      .send({
        'username': '',
        'email': 'aliceshen227@epam11.edu',
        'phonenumber': '223222222',
        'fullname': '',
        'password': 'qqwweerr',
      })
      .expect('Content-type,/json/')
      .end(function(err, res) {
        if (err !== null) {
          return;
        }
        assert.equal(res.status, HTTP_STATUSES.CONFLICT);
        assert.equal(res.body.errorType, 'phoneError');
        done();
      });
  });
});
