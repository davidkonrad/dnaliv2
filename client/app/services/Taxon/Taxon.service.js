'use strict';

angular.module('dnalivApp')
  .factory('Taxon', function ($resource) {
    
    // Public API here
	  return $resource('/api/taxon/:id', { id: '@taxon_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
