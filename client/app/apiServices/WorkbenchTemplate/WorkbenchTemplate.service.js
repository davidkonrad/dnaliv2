'use strict';

angular.module('dnalivApp')
  .factory('WorkbenchTemplate', function ($resource) {

    // Public API here
	  return $resource('/api/workbenchtemplates/:id', { id: '@WorkbenchTemplateID' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
  });
