'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/søgning', {
        templateUrl: 'app/soeg/soeg.html',
        controller: 'SoegCtrl'
      });
  });
