'use strict';

var should = require('should');
var app = require('../../app');
var request = require('superlokalitet_spot');

describe('GET /api/mysql/lokalitet_spot', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/mysql/lokalitet_spot')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
