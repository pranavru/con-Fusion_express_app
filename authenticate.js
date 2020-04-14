var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

//User.authenticate method helps us in a way that we need not write any authenticate method as passport already has it.
//It saves our time by helping us in signup and login process.
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());