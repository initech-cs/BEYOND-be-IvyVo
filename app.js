var express = require('express');
var path = require('path');
const dotenv = require("dotenv");
dotenv.config();

var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var genresRouter = require('./routes/genres')
// var eventsRouter = require('./routes/event')
var artistsRouter = require('./routes/artist')
var errorRouter = require('./routes/error')

var app = express();

const mongoose = require("mongoose");
const { errorHandler } = require('./controllers/errorController');
require("dotenv").config({ path: ".env" });


const cors = require("cors");

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.DB, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then(() => console.log("connected to database"))
  

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/genres',genresRouter);
// app.use('/events', eventsRouter);
app.use('/artists', artistsRouter);
app.use(errorRouter)

//errror Handler
app.use(errorHandler)

module.exports = app;
