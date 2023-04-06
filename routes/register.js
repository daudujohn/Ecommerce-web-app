const express = require('express');
const router = express.Router();
const UserController = require('../controllers/register');
const {validateUser} = require('../models/user');
const {joiFormatter, mongooseFormatter} = require('../utils/validationFormatter');
const guest = require('../middlewares/guest');

router.get('/', guest, (req, res) => {
    res.render('register')
})

router.post('/', guest, async (req, res) => {
    try{
        const {error} = validateUser(req.body)
        if (error) return res.render('register', {
            message: {
                type: 'error', 
                body: 'Validation Error'
            },  
            errors: joiFormatter(error), 
            formData: req.body
        })

        await UserController.addUser(req.body)
        return res.render('register', {
            message: {
                type: 'success', 
                body: 'Registration Successful'
            },  
            formData: req.body
        })
    }
    catch(e){
        res.status(500).render('register', {
            message: {
                type: 'error', 
                body: 'Validation Error'
            },  
            errors: mongooseFormatter(e), 
            formData: req.body
        })
    }
})

module.exports = router