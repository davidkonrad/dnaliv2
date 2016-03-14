'use strict';

angular.module('dnalivApp')
  .factory('Booking', function ($resource) {
    
    // Public API here
	  return $resource('/api/booking/:id', { id: '@booking_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
