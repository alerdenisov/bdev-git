var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'profile';
	locals.filters = {
		userId: req.params.userId
	};

	locals.data = {
		profile: null
	};

	view.on('init', function(next) {
		var q = keystone.list('Post').model.findOne({ _id: locals.filters.userId }); //.populate('author categories');

		q.exec(function(err, result) {
			locals.data.profile = result;
			next(err);
		});
	})

	// Render the view
	view.render('profile');

};
