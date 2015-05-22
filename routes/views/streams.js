var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'streams';

	locals.pageTags = ["bdev", "live"];

	locals.pageclass = 'project';

	locals.data = {
		channels: null
	};

	view.on('init', function(next) {
		var q = keystone.list('Channel').model.find().populate('user');

		q.exec(function(err, result) {

			if (err || !result.length) {
				return next(err);
			}

			locals.data.channels = result;
			// Load the counts for each category
			async.each(locals.data.channels, function(channel, next) {
				keystone.list('User').model.findOne().where('_id', channel.user).exec(function(err, result) {
					channel.user = result;
					next(err);
				});
			}, function(err) {
				next(err);
			});
		});
	});

	// Render the view
	view.render('streams');

};
