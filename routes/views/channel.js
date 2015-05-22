var keystone = require('keystone'),
		async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		  locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'streams';
  locals.pageclass = 'live__page';

	locals.pageTags = ["live"];

	locals.data = {
		channel: null
	};

	locals.filters = {
		channelId: req.params.channelId
	};

	view.on('init', function(next) {
		var q = keystone.list('Channel').model.findOne().where('_id', locals.filters.channelId).populate('user');
		q.exec(function(err, result) {
			locals.data.channel = result;
			locals.pageTags.push(result.user.slug);
			locals.pageTags.push(result.source + "_" + result.channelId);
			return next(err);
		});
	});

	// Render the view
	view.render('channel');

};
