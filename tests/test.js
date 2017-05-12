var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = 'http://localhost:8080';
var expect    = require("chai").expect;

chai.use(chaiHttp);

// check if homepage renders
describe('/', function() {
  it('homepage renders successfully', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });
});

// check if login renders
describe('/login', function() {
  it('login page renders successfully', function(done) {
    chai.request(server)
      // .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });
});

describe('/findevent', function() {
  it('returns all events', function(done) {
    chai.request(server)
      .get('/findevent')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
  // it('create a new event', function(done) {
  //   chai.request(server)
  //     .post('/createevent')
  //     .set('content-type', 'application/json')
  //     .send({name: 'Mace Windu', type: 'Master'})
  //     .end(function(err, res) {
  //       res.should.have.status(204);
  //       done();
  //     });
  // });
});
describe('/login', function() {
  it('renders the login page', function(done) {
    chai.request(server)
      .post('/login')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
  // it('creates a new account', function(done) {
  //   chai.request(server)
  //     .post('/createaccount')
  //     .send({name: 'Darth Maul', email: 'Lord@darkside.com', credType: "local"})
  //     .end(function(err, res) {
  //       res.should.have.status(204);
  //       done();
  //     });
  // });
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

describe('/', function() {
  it('should not yet be logged in upon ', function() {

  })
});
