var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = 'http://localhost:8080';
var expect    = require("chai").expect;

chai.use(chaiHttp);

// check if homepage renders
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

describe('joined events page', function() {
  it('joined event page renders successfully', function(done) {
    chai.request(server)
      .get('/joinedevents')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});


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

describe('initial site visit before logging in', function() {
  it('user is not logged in yet', function() {

  })
});
