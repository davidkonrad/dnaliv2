'use strict';

angular.module('dnalivApp')
  .factory('Lokalitet', function ($resource) {
    
    // Public API here
		return $resource('/api/lokalitet/:id', { id: '@lokalitet_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});

		return $resource('/api/lokalitet/:lokalitet_id', { lokalitet_id: '@lokalitet_id' }, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
   
	});
