/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

	app.use('/api/test', require('./api/mysql/test'));
	app.use('/api/projekt', require('./api/mysql/projekt'));

	//MongoDB
	//app.use('/api/specifymodels', require('./api/mongo/specifymodel'));
	app.use('/api/things', require('./api/mongo/thing'));
	app.use('/api/users', require('./api/mongo/user'));
	
	// File upload
	//app.use('/api/fileupload',  require('./api/fileupload'));

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
