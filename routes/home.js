const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) return res.render('dashboard', { name: req.user.name })
  return res.render('index', {name: null})
})

router.post('/logout', auth, function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});
module.exports = router;