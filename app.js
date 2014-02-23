var dotenv = require('dotenv');
dotenv.load();

require('./db');

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./routes');
var user = require('./routes/user');
var quotes = require('./routes/quotes');
var errors = require('./errors');
var http = require('http');
var path = require('path');

var passport = require('passport');
var DigestStrategy = require('passport-http').DigestStrategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(errors.log);
app.use(errors.client);
app.use(errors.server);

passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    if (username == process.env.USERNAME) {
      return done(null, username, process.env.PASSWORD);
    } else {
      return done(null, false);
    }
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

mongoose.connect(process.env.MONGODB_URI);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/says', quotes.random);
app.get('/quotes', quotes.index);
app.get('/quotes/:id', quotes.show);
app.post('/quotes', passport.authenticate('digest', { session: false }), quotes.create);
app.delete('/quotes/:id', passport.authenticate('digest', { session: false }), quotes.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
