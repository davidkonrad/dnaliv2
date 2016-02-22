'use strict';

angular.module('dnalivApp')
  .factory('WorkbenchRow', function ($resource) {
    
    // Public API here
	  return $resource('/api/workbenchrows/:id', { id: '@WorkbenchRowID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
