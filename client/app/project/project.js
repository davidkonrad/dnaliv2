'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/project', {
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      });
  });


