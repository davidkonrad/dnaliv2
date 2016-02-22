'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/view-tree/:treename?', {
        templateUrl: 'app/view-tree/view-tree.html',
        controller: 'ViewTreeCtrl'
      });
  });
