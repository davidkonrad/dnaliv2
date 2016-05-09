'use strict';

angular.module('dnalivApp')
  .factory('Klasse', function ($resource) {
    
    // Public API here
		return $resource('/api/klasse/:id', { id: '@klasse_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});

		/*
		return $resource('/api/klasse/:booking_id', { booking_id: '@booking_id' }, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
   	*/

	});
