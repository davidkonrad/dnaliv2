'use strict';

angular.module('dnalivApp')
  .factory('Projekt_taxon', function ($resource) {
    
    // Public API here
	  return $resource('/api/projekt_taxon/:id', { id: '@projekt_taxon_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
