const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../keys');
const { User } = require('../db/models/index');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user.id);
    })

})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        // callbackURL: '/dashboard',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // check if user exists already
        User.findOne({ googleId: profile.id }).then(currentUser => {
            if (currentUser) {
                // exists user
                done(null, currentUser);
            } else {
                // new user
                new User({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    // tasks: [],
                    token: accessToken
                }).save()
                    .then(newUser => {
                        console.log('new user created: ' + newUser);
                        done(null, newUser);
                    });
            }
        })


    })
)
