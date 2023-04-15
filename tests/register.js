const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { default: mongoose } = require('mongoose');
const config = require('config');
const {User} = require('../models/user');
let server;

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('User Registration', () => {
    let user = {
        name: 'Test User', 
        email: `test${new Date().getTime()}@example.com`,
        password: 'testpassword'
    };
 
    beforeEach(async () => {
        server = app.listen(process.env['PORT'] || 3002)
        
        try{
            await mongoose.connection.close();
            const dbConnection = await mongoose.connect(config.get('test.conn'), {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
            })
            testUser = new User(user)
            await testUser.save();
        }
        catch (err){
            console.error(err)
        }
    })

    afterEach(async () => {
        try{
            await User.deleteMany({})
            await mongoose.connection.close();
            await server.close()
        }
        catch (err){
            console.error(err)
        }
    })

    describe('GET /register', () => {
        it('should return 200 for a valid guest user', async () => {
            const res = await chai.request(app).get('/register')
            res.should.have.status(200)
        })
    
        it('should redirect to homepage for an authenticated user', async () => {
            const agent = request.agent(app)
            await agent.post('/login')
                .type('form')
                .send({email: user.email, password: user.password})
            
            const res = await agent.get('/register')
            
            res.should.have.status(302)
            res.should.have.header('location', '/')
        })
        
    })
    
    describe('POST /register', () => {
        user.repeat_password = user.password
        const exec = async () => {
            // const agent = request.agent(app)
            return await chai.request(app).post('/register')
            .type('form')
            .send(user)
        } 

        it('should return 200 if registration is valid', async () => {
            try{
                await User.deleteMany({})
                const res = await exec()
                res.should.have.status(200)
                res.text.should.contain('Registration Successful')
            }
            catch (err){
                console.error(err)
            }

        })    

        it('should redirect to registation page with previous input given invalid input', async () => {
            try{
                user.password = ''
                const res = await exec()
                res.should.have.header('location', '/register')
                res.should.have.status(302)
                res.text.should.contain('Validation Error')
            }
            catch(err){
                console.error(err);
            }
        })
    })
})
