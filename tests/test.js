var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = 'http://localhost:8080';
var expect    = require("chai").expect;
var request = require("request");

chai.use(chaiHttp);

// check which pages renders
describe("rendering site pages", function() {

  describe('homepage', function() {
    it('homepage renders successfully', function(done) {
      chai.request(server)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        })
    });
  });

  describe('login page', function() {
    it('login page renders successfully', function(done) {
      chai.request(server)
        .post('/login')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('create account page', function() {
    it('create account page renders successfully', function(done) {
      chai.request(server)
        .get('/createaccount')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('created event page', function() {
    it('created event page renders successfully', function(done) {
      chai.request(server)
        .get('/createdevents')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });

});

describe('user visits pages that require authentication', function() {
  it('user is redirected to login page', function() {

  })
});

describe("API returns events", function() {

  var url = "http://localhost:8080/api/events";

  it("returns status 200 and json objects", function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});

describe("API returns events", function() {

  var url = "http://localhost:8080/api/events";

  it("returns status 200 and json objects", function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});


// describe('created event page', function() {
//   it('created event page renders successfully', function(done) {
//     chai.request(server)
//       .get('/createdevents')
//       .end(function(err, res) {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });

// describe('joined events page', function() {
//   it('joined event page renders successfully', function(done) {
//     chai.request(server)
//       .get('/joinedevents')
//       .end(function(err, res) {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });


// describe('testing addition', function() {
//   it('adds numbers together', function() {
//     expect(1+1).to.equal(2);
//     console.log('tetsadsfasdf');
//   })
// });
//
// describe('testing addition', function() {
//   it('adds numbers together', function() {
//     expect(1+1).to.equal(2);
//   })
// });
