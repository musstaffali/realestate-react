const express = require('express');
const createError = require('http-errors');
const path = require('path');
// const bodyParser = require('body-parser')
const passport = require('passport');
const port = 3000;
const hostname = "localhost";
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/realestate';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

connect.then(() => console.log('Connected correctly to server'),
err => console.log(err))

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/user', userRouter)

app.use(express.static(path.join(_dirname, 'public')));
// app.use(bodyParser.json())

app.use(function(req,res,next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error')
});

app.listen(port, hostname);
