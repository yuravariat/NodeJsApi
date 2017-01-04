
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , compression = require('compression')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger({
	  format: 'dev', 
	  stream: fs.createWriteStream('logs/app-base.log', {'flags': 'w'})
	}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.compress());
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'),{ maxAge: oneDay }));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/ping', api.ping);
app.post('/ping', api.ping);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
