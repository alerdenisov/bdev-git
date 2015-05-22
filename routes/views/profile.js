var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.pageclass = "project";
	locals.section = 'profile';
	locals.pageTags = [];

	locals.filters = {
		userId: req.params.userId
	};

	locals.data = {
		profile: null
	};

	view.on('init', function(next) {
		var q = keystone.list('User').model.findOne().where('_id', locals.filters.userId);

		q.exec(function(err, result) {
			if(result) {
				locals.data.profile = result;
				locals.pageTags.push(result.slug);
				next(err);
			} else {
				console.log("test");
				next(err, "cant find user");
			}
		});
	});

	// Render the view
	view.render('profile');

};
