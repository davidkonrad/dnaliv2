'use strict';

angular.module('dnalivApp')
  .factory('Projekt', function ($resource) {
    
	console.log('PROJEKT Projekt.service');

    // Public API here
	  return $resource('/api/projekt/:id', { id: '@projekt_id' }, {
	      update: {
	        method: 'PUT' // this method issues a PUT request
	      }
	    });
   
  });
