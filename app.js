const Express = require('express');
const Path = require('path');
const Favicon = require('serve-favicon');
const Logger = require('morgan');
const CookieParser = require('cookie-parser');
const BodyParser = require('body-parser');

const Routes = require('./routes/index');

const App = Express();

// view engine setup
App.set('views', Path.join(__dirname, 'views'));
App.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
App.use(Logger('dev'));
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(Express.static(Path.join(__dirname, 'public')));

App.use('/', routes);

// catch 404 and forward to error handler
App.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
