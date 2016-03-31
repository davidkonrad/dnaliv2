'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookings', {
        templateUrl: 'app/bookings/bookings.html',
        controller: 'BookingCtrl'
      })
      .when('/bookings/:id', {
        templateUrl: 'app/bookings/bookings.html',
        controller: 'BookingCtrl'
      });

  });


