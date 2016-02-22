'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/tree-upload', {
        templateUrl: 'app/csv-tree-upload/csv-tree-upload.html',
        controller: 'CsvTreeUploadCtrl'
      });
  });
