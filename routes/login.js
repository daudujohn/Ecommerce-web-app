const express = require('express');
const router = express.Router();
const passport = require('passport');
const guest = require('../middlewares/guest');
const flash = require('../middlewares/flash');

router.get('/', [guest, flash], (req, res) => {
    res.render('auth/login', {title: 'Login'})
})

router.post('/', [guest, flash], (req, res, next) => {
 passport.authenticate('local', (err, user, info) => {
    if (err) {
        console.log('Err: ', err);
        req.session['flashData'] = {
            message: {
                type: 'error', 
                body: 'Something went wrong'
            },
            formData: req.body,
            errors: {}
        }
        return res.redirect('/login')
    }
    if (!user) {
        req.session['flashData'] = {
            message: {
                type: 'error', 
                body: info.loginError
            },  
            formData: req.body
        }
        return res.redirect('/login')
    }
    req.logIn(user, (err) => {
        if (err) {
            req.session['flashData'] = {
                message: {
                    type: 'error', 
                    body: 'Something went wrong'
                },  
            }
            return res.redirect('/login')    
        }
        return res.redirect('/')
    })
 })(req, res, next)
})

module.exports = router;