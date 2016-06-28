'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/obvious', {
        templateUrl: 'app/obvious/obvious.html',
        controller: 'ObviousCtrl'
      });
  });
