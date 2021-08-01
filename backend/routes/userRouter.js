const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();
const authenticate = require('../authenticate');

router.get('/', (req, res, next) => {
    User.find()
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(users);
    })
    .catch(err => next(err));
});

router.post('/signup', (req,res) => {
    User.register(
        new User({username: req.body.username, email: req.body.email}),
        req.body.password,
        (err, user) => {
            if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        } else {
            if(req.body.username) {
                user.username = req.body.username;
            }
            if(req.body.email) {
                user.email = req.body.email
            }
            user.save(err => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            });
        }
    }
);
})


router.post('/login', passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', (req, res, next) => {
    if(req.user) {
        req.logout();
        res.redirect('/');
        res.send("You are logged out")
    } else {
        const err = new Error ('You are not logged in');
        err.status = 401;
        return next(err)

    }
});

module.exports = router;