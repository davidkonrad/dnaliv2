'use strict';

angular.module('dnalivApp')
  .factory('Kommentar', function ($resource) {
    
    // Public API here
	  return $resource('/api/kommentar/:id', { id: '@kommentar_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
    });
   
  });
