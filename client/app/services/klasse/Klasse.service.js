'use strict';

angular.module('dnalivApp')
  .factory('Klasse', function ($resource) {
    
    // Public API here
	  return $resource('/api/klasse/:id', { id: '@klasse_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
