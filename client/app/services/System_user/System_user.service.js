'use strict';

angular.module('dnalivApp')
  .factory('System_user', function ($resource) {
    
    // Public API here
	  return $resource('/api/system_user/:id', { id: '@user_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
