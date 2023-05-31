const express = require('express');
const router = express.Router();
const { addCategory } = require('../controllers/category');  

router.get('/add', (req, res) => {
    res.render('category/add')
})

router.post('/api/v1/', async (req, res) => {
    const category = await addCategory(req.body);
    return res.json(category);
})

module.exports = router;