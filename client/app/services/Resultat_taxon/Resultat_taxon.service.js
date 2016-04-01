'use strict';

angular.module('dnalivApp')
  .factory('Resultat_taxon', function ($resource) {
    
    // Public API here
	  return $resource('/api/resultat_taxon/:id', { id: '@resultat_taxon_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
