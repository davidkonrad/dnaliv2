'use strict';

angular.module('dnalivApp')
  .factory('Klassetrin', function ($resource) {
    
    // Public API here
	  return $resource('/api/klassetrin/:id', { id: '@klassetrin_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
