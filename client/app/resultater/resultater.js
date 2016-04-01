'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/resultater', {
        templateUrl: 'app/resultater/resultater.html',
        controller: 'ResultaterCtrl'
      });
  });
