const Express = require('express');
const Path = require('path');
const Favicon = require('serve-favicon');
const Logger = require('morgan');
const CookieParser = require('cookie-parser');
const BodyParser = require('body-parser');
const Session = require('express-session');
const MongoStore = require('connect-mongo')(Session);

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

App.use('/', Routes);

// catch 404 and forward to error handler
App.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// use mongo to store session data
App.use(Session({
  cookie: { maxAge: 1000*60*2 },
  store: new MongoStore({
    url: 'mongodb://tzmanics:jy2UF7ja@novus.modulusmongo.net:27017/aqa4vaDe'
  })
}));

// error handlers

// development error handler
// will print stacktrace
if (App.get('env') === 'development') {
  App.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
App.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = App;
