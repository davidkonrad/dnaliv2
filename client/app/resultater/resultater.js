'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/resultater/:id?', {
        templateUrl: 'app/resultater/resultater.html',
        controller: 'ResultaterCtrl'
      });
  });
