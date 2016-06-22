'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/visualisering', {
        templateUrl: 'app/visualisering/visualisering.html',
        controller: 'VisualiseringCtrl'
      });
  });
