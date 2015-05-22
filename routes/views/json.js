var keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname);

// Load JSON servers
var json = {
    servers: importRoutes('json')
};

exports = module.exports = function (req, res) {
    
    var view = new keystone.View(req, res);
    
    // req.params.name has the name of the json server as sent in the url
    view.render(json.servers[req.params.name], {
        section: 'json-data'
    });
}