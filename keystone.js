// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
    handlebars = require('express-handlebars'),
    daemon = require('./daemon/daemon');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    
    'name': 'Bdev',
    'brand': 'Bdev',
    
    'less': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'hbs',
    
    'custom engine': handlebars.create({
        layoutsDir: 'templates/views/layouts',
        partialsDir: 'templates/views/partials',
        defaultLayout: 'default',
        helpers: new require('./templates/views/helpers')(),
        extname: '.hbs'
    }).engine,
    
    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': 'bUi/Hu+,_`uN1W-%+vtr#TxRg?h~<|1XTN73G6P>VdAeprBZ]ovgM`HRsOn=5cA6'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
    'posts': ['posts', 'post-categories'],
    'galleries': 'galleries',
    'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

var deepPopulate = require('mongoose-deep-populate');
keystone.mongoose.plugin(deepPopulate);

keystone.start(
    {
        // http:
        onHttpServerCreated: function () {
            keystone.app.server = keystone.httpServer;
            var io = keystone.app.io = require('socket.io')(keystone.app.server);
            
            var userToToken = keystone.app.userToTokenList;
            var socketToToken = keystone.app.socketToToken = {};
            
            Array.prototype.remove = function () {
                var what, a = arguments, L = a.length, ax;
                while (L && this.length) {
                    what = a[--L];
                    while ((ax = this.indexOf(what)) !== -1) {
                        this.splice(ax, 1);
                    }
                }
                return this;
            };
            
            var recursiveCreateTagAndAttach = function (tags, dbtags, cb) {
                if (!tags || !tags.length) {
                    cb(dbtags);
                    return;
                }
                
                if (!dbtags)
                    dbtags = [];
                
                var tag = tags.shift();
                var Tag = keystone.list('Tag');
                var newTag = new Tag.model({ short: tag });
                newTag.save(function () {
                    dbtags.push(newTag);
                    recursiveCreateTagAndAttach(tags, dbtags, cb);
                });
            }
            
            var dbTags = function (tags, message) {
                // for(var t in tags) {
                // var tag = tags[t];
                
                var Tag = keystone.list('Tag');
                var q = Tag.model.find().where('short').in(tags);
                
                q.exec(function (err, dbtags) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    
                    var messageTags = [];
                    
                    for (var i in dbtags) {
                        var dbtag = dbtags[i];
                        tags.remove(dbtag.short);
                    }
                    
                    recursiveCreateTagAndAttach(tags, dbtags, function (attachTags) {
                        for (var i = 0; i < attachTags.length; i++) {
                            console.log(attachTags[i]);
                            message.tags.push(attachTags[i]);
                        }
                        
                        message.save(function (err) {
                            if (err) console.log(err);
                        });
                    });
                });
            };
            
            io.on('connection', function (socket) {
                console.log('a user connected');
                socket.on('chat.message', function (tags, msg) {
                    if (socketToToken[socket]) {
                        var token = socketToToken[socket];
                        var user = keystone.app.tokenToUser[token];
                        if (user) {
                            var ChatMessage = keystone.list('ChatMessage');
                            
							var newMessage = ChatMessage.model({
                                text: msg,
                                author: user
                            });
							
                            newMessage.save(function (err) {
                                if (!err && tags) {
                                    dbTags(tags, newMessage);
                                }
                            });

                            io.emit('chat.message', {
                                name: user.name,
								avatar: user.avatar,
                                _id: user._id
                            }, msg);
                        } else {
                            console.log("can't find user for token " + token);
                        }
                    }
                });
                
                socket.on('chat.assign', function (token) {
                    console.log("Assin token to socket: " + token);
                    socketToToken[socket] = token;
                });
            });
        }
    });

var User = keystone.list('User');
User.model.count().where('email', "test@admin.com").exec(function(err, count) {
	if(!count) {
		var admin = new User.model({
			name: {
				first: "Main",
				last:  "Admin"
			},
			password: 11111,
			isAdmin: true,
			email: "test@admin.com"
		});

		admin.save(function(err) {});
	}		
});

daemon.exec();
