const express = require('express')
const config = require('config');
const logger = require('morgan');
require('./utils/db.config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const session = require('express-session')
const passport = require('passport');
require('./utils/localAuthStrategy');
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo');
const home = require('./routes/home');
const register = require('./routes/register');
const login = require('./routes/login');

const app = express() 

app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
// app.set('trust proxy', 1)
app.use(session({
  secret: '0c5df404a24f217552de79ff6af08054b43e9e6c8f757b7647abfdf6f63416e9',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, 
  store: MongoStore.create({ mongoUrl: config.get('db.conn') })
}))
app.use(passport.initialize());
app.use(passport.session());
views_data = {message: {}, errors: {}, formData: {}}
for (key in views_data) app.locals[key] = views_data[key]

app.use('/', home)
app.use('/register', register)
app.use('/login', login)



const PORT = process.env.PORT || 3000

if (require.main === module){
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
}

module.exports = app