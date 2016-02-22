    'use strict';

  angular.module('dnalivApp')
    .factory('WorkbenchTemplateMappingItem', function ($resource) {

      // Public API here
		
  	  return $resource('/api/workbenchtemplatemappingitems/:id', { id: '@WorkbenchTemplateMappingItemID' }, {
  	      update: {
  	        method: 'PUT' // this method issues a PUT request
  	      },
		  'getFromWorkbenchTemplate': {
		        method:'GET',
		        params: {
		         id: '@WorkbenchTemplateID'
		        },
		        url: '/api/workbenchtemplates/:id/workbenchtemplatemappingitems/',
		        isArray: true
		       }
		     }
  	    );
    });
