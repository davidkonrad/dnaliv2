'use strict';

angular.module('dnalivApp')
  .factory('Proeve_extras', function ($resource) {
    
    // Public API here
	  return $resource('/api/proeve_extras/:id', { id: '@extras_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
   
  });
