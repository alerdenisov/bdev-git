var keystone = require('keystone');
    

exports = module.exports = function (next, req, res) {
    var jsonResponse = {};

    var queryFunc = {
        'messages': function (next, req, res) {
            var q = keystone.list('ChatMessage')
				.paginate({
					page: req.query.page || 1,
					perPage: 10,
					maxPages: 10
				})
				.sort('-createdAt')
				.populate('author tags');
            
            if (req.query.tags) {
                var tags = req.query.tags.split(";");
                var tagQ = keystone.list('Tag').model.find().where('short').in(tags);
                tagQ.exec(function(err, dbTags) {
                    q.where('tags').in(dbTags);
                    q.exec(function (err, data) {
                        if (data && data.results) {
                            jsonResponse.data = data;
							
							for(var i = 0; i < jsonResponse.data.results.length; i++) {
								jsonResponse.data.results[i].slug = undefined;
								jsonResponse.data.results[i].author.password = undefined;
								jsonResponse.data.results[i].author.email = undefined;
							}
                        }
						
						res.json(jsonResponse);
                    });
                });
            } 
            else
            {
                q.exec(function(err, messages) {
                    jsonResponse.data = messages;
                    res.json(jsonResponse);
                });
            }
        }
    }
    
    // you can get any query parameters here, eg blog id to get data for, eg:
    var func = req.query.func;
    
    if (func && queryFunc[func] && typeof queryFunc[func] === "function") {
        queryFunc[func](next, req, res);
    } else {
        next("something goin wrong");
    }
}
