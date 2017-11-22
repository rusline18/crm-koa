const passport = require('koa-passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !user.checkPassword(password)) {
                return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
            }
            return done(null, user);
        });
    })
);

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser');
    User.findById(id, (err, user) => {
        done(err, user);
    })
});
module.exports = passport;