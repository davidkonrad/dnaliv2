'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/csv-upload', {
        templateUrl: 'app/csv-upload/csv-upload.html',
        controller: 'CsvUploadCtrl'
      });
  });
