'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/prøver', {
        templateUrl: 'app/proeve/proeve.html',
        controller: 'ProeveCtrl'
      });
  });
