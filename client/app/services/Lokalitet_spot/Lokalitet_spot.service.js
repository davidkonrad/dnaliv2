'use strict';

angular.module('dnalivApp')
  .factory('Lokalitet_spot', function ($resource) {
    
    // Public API here
		return $resource('/api/lokalitet_spot/:id', { id: '@lokalitet_spot_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});

	});
