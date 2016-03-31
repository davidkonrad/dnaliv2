'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookings', {
        templateUrl: 'app/oversigt/oversigt.html',
        controller: 'OversigtCtrl'
      });
  });
