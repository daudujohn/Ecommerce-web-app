const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/user');

router.get('/', (req, res) => {
    res.render('register', { message: null })
})

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = new User(req.body)
    await user.save()

    res.render('register', { message: 'Registration Successful' })
})

module.exports = router