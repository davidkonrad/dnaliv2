'use strict';

angular.module('dnalivApp')
  .factory('GeologicTimePeriodTreeDefItem', function ($resource) {
    
    // Public API here
	  return $resource('/api/geologictimeperiodtreedefitems/:id', { id: '@GeologicTimePeriodTreeDefItemID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
