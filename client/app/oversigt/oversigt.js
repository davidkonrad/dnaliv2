'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/oversigt', {
        templateUrl: 'app/oversigt/oversigt.html',
        controller: 'OversigtCtrl'
      });
  });
