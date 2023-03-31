const express = require('express')
require('./utils/db.config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bodyParser = require('body-parser')
const {User, validateUser} = require('./models/user');

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register', { message: null})
})

app.post('/register', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = new User(req.body)
    await user.save()

    res.render('register', { message: 'Registration Successful'})
})

const PORT = process.env.PORT || 3000

if (require.main === module){
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

module.exports = app