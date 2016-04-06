'use strict';

angular.module('dnalivApp')
  .factory('Resultat_item', function ($resource) {
    
    // Public API here
	  return $resource('/api/resultat_item/:id', { id: '@resultat_item_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
