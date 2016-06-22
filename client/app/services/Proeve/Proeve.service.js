'use strict';

angular.module('dnalivApp')
  .factory('Proeve', function ($resource) {
    
    // Public API here
	  return $resource('/api/proeve/:id', { id: '@proeve_id' }, {
			update: {
				method: 'PUT' // this method issues a PUT request
			}
		});
   
  });
