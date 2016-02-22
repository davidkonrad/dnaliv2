'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/datasets/datasets.html',
        controller: 'DatasetsCtrl'
      });
  });