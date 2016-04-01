'use strict';

angular.module('dnalivApp')
  .factory('Resultat', function ($resource) {
    
    // Public API here
	  return $resource('/api/resultat/:id', { id: '@resultat_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
