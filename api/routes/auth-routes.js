const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/dashboard";

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/dashboard");
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect(CLIENT_HOME_PAGE_URL);
});

module.exports = router;