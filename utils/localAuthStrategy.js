const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require('../models/user');

passport.use(new LocalStrategy({ 'usernameField': 'email' }, 
    async (email, password, done) => {
    try{
        const user = await User.findOne({ email })
        if (!user) return done(null, false, { loginError: process.env['NODE_ENV'] !== 'production' ? 'User not Found' : 'Invalid Username or Password' })
        if (await user.confirmPassword(password)) return done(null, user);
        return done(null, false, { loginError: process.env['NODE_ENV'] !== 'production' ? 'Incorrect Password' : 'Invalid Username or Password' });
    }
    catch (e) {
        done(e)
    }
}))

passport.serializeUser(function(user, done) {
    process.nextTick(() => {
        done(null, { id: user._id, name: user.name });
    });
});

passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        return done(null, user);
    });
});