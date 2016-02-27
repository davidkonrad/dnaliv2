'use strict';

angular.module('dnalivApp')
  .factory('Fag', function ($resource) {
    
    // Public API here
	  return $resource('/api/fag/:id', { id: '@fag_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
