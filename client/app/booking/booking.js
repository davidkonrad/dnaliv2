'use strict';

angular.module('dnalivApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookings', {
        templateUrl: 'app/booking/booking.html',
        controller: 'BookingCtrl'
      });
  });
