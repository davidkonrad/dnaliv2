'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookings', {
        templateUrl: 'app/bookings/bookings.html',
        controller: 'BookingCtrl'
      });
  });


