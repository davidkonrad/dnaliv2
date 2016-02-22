'use strict';

angular.module('dnalivApp')
  .factory('Test', function ($resource) {
    
    // Public API here
	  return $resource('/api/test/:id', { id: '@test_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
