'use strict';
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var env             = process.env.NODE_ENV || 'development';
var pkg             = require('./package.json');
var indexController = require('./controllers/index');
var errorHandler    = require('errorhandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.locals.pkg      = pkg;
    res.locals.NODE_ENV = env;
    if(_.isObject(req.user)) {
        res.locals.User = req.user
    }
    next()
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function handleNotFound(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
      res.render('404', { url: req.url, error: '404 Not found' });
      return;
    }

    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }

    res.type('txt').send('Not found');
  })

  if (env === 'development') {

    app.use(errorHandler());

  } else {

    app.use(function logErrors(err, req, res, next){
      if (err.status === 404) {
        return next(err)
      }

      console.error(err.stack)
      next(err)
    })

    app.use(function respondError(err, req, res, next){
      var status, message

      status = err.status || 500;
      res.status(status);

      message = ((err.productionMessage && err.message) ||
        err.customProductionMessage)

      if (!message) {
        if (status === 403) {
          message = 'Not allowed'
        } else {
          message = 'Oops, there was a problem!'
        }
      }

      if (req.accepts('json')) {
        res.send({error: message})
        return

      } else {
        res.type('txt').send(message + '\n')
        return
      }

    })
  }


module.exports = app;
