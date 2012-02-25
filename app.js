
/**
 * Module dependencies.
 */

var PORT = 3001,
  express = require('express'),
  stylus = require('stylus'),
  nib = require('nib'),
  routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure('development', function(){
  var stylusMiddleware = stylus.middleware({
    src: __dirname + '/stylus/', // .styl files are located in `/stylus`
    dest: __dirname + '/public/', // .styl resources are compiled `/css/*.css`
    debug: true,
    compile: function(str, path) { // optional, but recommended
      return stylus(str)
        .set('filename', path)
        .set('warn', true)
        .set('compress', true)
        .use(nib());
      }
  });
  app.use(stylusMiddleware);  
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.set('view options', { pretty: true });
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](__dirname + '/public'));
});

// Routes

app.get('/', routes.index);

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
