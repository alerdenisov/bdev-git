/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
		keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Blog',		key: 'blog',		href: '/blog' },
		{ label: 'Gallery',		key: 'gallery',		href: '/gallery' }
	];

	locals.user = req.user;

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};

exports.chatUserToken = function(req, res, next) {
	function makeid()
	{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
	}

	if(typeof keystone.app.userToToken === "undefined") {
		keystone.app.userToToken = {};
	}

	if(typeof keystone.app.tokenToUser === "undefined") {
		keystone.app.tokenToUser = {};
	}

	var list = keystone.app.userToToken;

	if(typeof req.user !== "undefined") {
		if(typeof list[req.user._id] === "undefined") {
			var token = list[req.user._id] = makeid();
			keystone.app.tokenToUser[token] = req.user;
		}

		res.locals.chatUserToken = list[req.user._id];
	}

	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
*/

exports.requireUser = function(req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
