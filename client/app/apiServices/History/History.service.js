'use strict';

angular.module('dnalivApp')
  .factory('History', function ($resource) {
    // Service logic
    // Public API here
	  return $resource('/api/historys/:id', { id: '@historyId' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
  });
