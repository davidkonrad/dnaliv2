'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/projekter', {
        templateUrl: 'app/projekter/projekter.html',
        controller: 'ProjektCtrl'
      });
  });


