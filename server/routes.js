/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

	app.use('/api/test', require('./api/mysql/test'));
	app.use('/api/projekt', require('./api/mysql/projekt'));
	app.use('/api/klasse', require('./api/mysql/klasse'));
	app.use('/api/klassetrin', require('./api/mysql/klassetrin'));
	app.use('/api/fag', require('./api/mysql/fag'));
	app.use('/api/taxon', require('./api/mysql/taxon'));
	app.use('/api/projekt_taxon', require('./api/mysql/projekt_taxon'));

	//MongoDB
	app.use('/api/users', require('./api/mongo/user'));
	app.use('/auth', require('./auth'));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function(req, res) {
			res.sendfile(app.get('appPath') + '/index.html');
		});

};
