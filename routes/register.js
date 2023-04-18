const express = require('express');
const router = express.Router();
const UserController = require('../controllers/register');
const {validateUser} = require('../models/user');
const {joiFormatter, mongooseFormatter} = require('../utils/validationFormatter');
const guest = require('../middlewares/guest');
const flash = require('../middlewares/flash');


router.get('/', [guest, flash], (req, res) => {
    res.render('auth/register')
})

router.post('/', [guest, flash], async (req, res) => {
    try{
        const {error} = validateUser(req.body)
        if (error) {
            req.session['flashData'] = {
                    message: {
                        type: 'error', 
                        body: 'Validation Error'
                    },  
                    errors: joiFormatter(error), 
                    formData: req.body
                }
            return res.redirect('/register')
        }

        await UserController.addUser(req.body)
        req.session['flashData'] = {
            message: {
                type: 'success', 
                body: 'Registration Successful'
            },  
            formData: req.body
        }
        return res.redirect('/register')

    }
    catch(e){
        req.session['flashData'] = {
            message: {
                type: 'error', 
                body: 'Validation Error'
            },  
            errors: mongooseFormatter(e), 
            formData: req.body
        }
        res.status(500).redirect('/register')
    }
})

module.exports = router