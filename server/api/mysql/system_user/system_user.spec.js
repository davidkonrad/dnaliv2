'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supersystem_user');

describe('GET /api/mysql/system_user', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/mysql/system_user')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
