const chai = require('chai');
const chaiHttp = require('chai-http');
const { beforeEach } = require('mocha');
const app = require('../index');

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Server', () => {
    let server;
 
    beforeEach((done) => {
        server = app.listen(process.env['PORT'] || 3001, done)
    })

    afterEach((done) => {
        server.close(done)
    })

    it('should return 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)              
                res.body.should.be.a('object')
                done();
            })
    })    
})
