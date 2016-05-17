
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var webhook = require('./routes/webhook.js');
var fs = require('fs');

var register = function (app) {
    // config middleware
    app.configure(function(){
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
      app.use(express.static(__dirname + '/public'));
    });

    // config routes
    app.get('/', webhook.webhook);
    app.get('/webhook', webhook.messengerwebhook);
};
var options = {
  key: fs.readFileSync('./ssl/server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};
var https = express.createServer(options);
register(https);
https.listen(8000);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/webhook', webhook.webhook);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
