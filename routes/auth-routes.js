const router = require('express').Router();
const passport = require('passport');

const PATH = process.env.NODE_ENV === 'production'
    ? "https://evening-basin-86768.herokuapp.com/dashboard"
    : "http://localhost:3000/dashboard";

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(PATH);
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect(PATH);
});

module.exports = router;