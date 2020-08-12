const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    console.log("aa");
    req.logout();
    process.env.NODE_ENV === 'production'
        ? res.redirect('http://evening-basin-86768.herokuapp.com/dashboard')
        : res.redirect('http://localhost:3000/dashboard');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    process.env.NODE_ENV === 'production'
        ? res.redirect('http://evening-basin-86768.herokuapp.com/dashboard')
        : res.redirect('http://localhost:3000/dashboard');
});

module.exports = router;