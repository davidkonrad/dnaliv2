'use strict';

angular.module('dnalivApp')
  .factory('TaxonTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/taxontreedefitems/:id', { id: '@TaxonTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
