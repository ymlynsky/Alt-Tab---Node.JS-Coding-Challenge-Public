'use strict';

let assert = require('chai').assert;
let request = require('supertest-as-promised');

let app = require('../../app');
let _user = 'integration_test_' + Math.floor(Date.now() / 1000) + '@alttab.co';

describe('Authentication Controller', () => {

  it('should register a new user and return token', () => {
    let _token = null;

    return request(app)
      .post('/api/register')
      .send({
        email: _user,
        password: 'integration',
        name: 'Integration Test'
      })
      .expect(201)
      .then((data) => {
        _token = data.body.token;
        assert.ok(_token);
      });
  });

  it('should login existing User', () => {
    let _token = null;
    return request(app)
      .post('/api/login')
      .send({
        email: _user,
        password: 'integration'
      })
      .expect(200)
      .then((data) => {
        _token = data.body.token;
        assert.ok(_token);
      });
  });

  it('should return an error bad request if email is used', () => {
    return request(app)
      .post('/api/register')
      .send({
        email: _user,
        password: 'integration',
        name: 'Integration Test'
      })
      .expect(400);
  });

  it('should return an error bad request if email isn\'t specified', () => {
    return request(app)
      .post('/api/register')
      .send({
        password: 'integration',
        name: 'Integration Test'
      })
      .expect(400);
  });

  it('should return an error bad request if password isn\'t specified', () => {
    return request(app)
      .post('/api/register')
      .send({
        email: _user,
        name: 'Integration Test'
      })
      .expect(400);
  });
});

describe('Profile controller', () => {

  let _token = null;

  before(() => {
    return request(app)
      .post('/api/login')
      .send({
        email: _user,
        password: 'integration'
      })
      .then((data) => {
        _token = data.body.token;
        assert.ok(_token);
      });
  });

  it('should fetch the profile info of existing user', () => {
    return request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer ' + _token)
      .expect(200)
      .then((data) => {
        assert.equal(data.body.email, _user);
      });
  });

  it('should return an error when token is not specified', () => {
    return request(app)
      .get('/api/profile')
      .expect(401);
  });
});