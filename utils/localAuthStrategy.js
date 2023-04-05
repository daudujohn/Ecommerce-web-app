const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User, confirmPassword } = require('../models/user');

passport.use(new LocalStrategy({ 'usernameField': 'email' }, 
    async (email, password, done) => {
    try{
        const user = await User.findOne({ email })
        if (!user) return done(null, false)
        if (await user.confirmPassword(password)) return done(null, user);
        return done(null, false);
    }
    catch (e) {
        done(e)
    }
}))
// if (!user.verifyPassword(password)) return done(null, false)

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