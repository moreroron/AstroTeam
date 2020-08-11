const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/dashboard');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    process.env.NODE_ENV === 'production'
        ? res.redirect('/dashboard')
        : res.redirect('/localhost:3000/dashboard');
    // res.send("call from /google/redirect");
});

module.exports = router;