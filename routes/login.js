const express = require('express');
const router = express.Router();
const passport = require('passport');
const guest = require('../middlewares/guest');

router.get('/', guest, (req, res) => {
    res.render('login', {message: {}, errors: {}, formData: {}})
})

router.post('/', guest, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), 
  (req, res) => {
    res.render('login', {
        message: {
            type: 'success', 
            body: 'Login Successful'
        }, 
        errors: {}, 
        formData: {}
    })
})

module.exports = router;