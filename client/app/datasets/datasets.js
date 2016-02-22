'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/datasets', {
        templateUrl: 'app/datasets/datasets.html',
        controller: 'DatasetsCtrl',
      });
  });
