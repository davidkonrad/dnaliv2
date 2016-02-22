'use strict';

angular.module('dnalivApp')
  .factory('GeographyTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/geographytreedefitems/:id', { id: '@GeographyTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
