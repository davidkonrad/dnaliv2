'use strict';

angular.module('dnalivApp')
  .factory('Booking_taxon', function ($resource) {
    
    // Public API here
	  return $resource('/api/booking_taxon/:id', { id: '@booking_taxon_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
