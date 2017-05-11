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
