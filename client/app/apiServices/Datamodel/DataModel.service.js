'use strict';

angular.module('dnalivApp')
  .factory('DataModel', function ($resource) {
    
    // Public API here
	  
	  return $resource('/api/datamodels/:id');
   
  });
