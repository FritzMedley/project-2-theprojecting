var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = 'http://localhost:8080';

chai.use(chaiHttp);


describe('/', function() {
  it('returns the sess', function(done) {
    chai.request(server)
      .get('/dontexist')
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
  it('create a new event', function(done) {
    chai.request(server)
      .post('/createevent')
      .set('content-type', 'application/json')
      .send({name: 'Mace Windu', type: 'Master'})
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
describe('/login', function() {
  it('return a login page', function(done) {
    chai.request(server)
      .get('/siths')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
  it('creates a new account', function(done) {
    chai.request(server)
      .post('/siths')
      .set('content-type', 'application/json')
      .send({name: 'Darth Maul', type: 'Lord'})
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
