'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', 'Geo', 'Utils', 'Booking', '$timeout', '$modal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
	 function($scope, $compile, Geo, Utils, Booking, $timeout, $modal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		Booking.query().$promise.then(function(bookings) {
			$scope.bookings = bookings
		})

		/*
		$scope.bookingOptions = DTOptionsBuilder.
			fromFnPromise(function() {
        return Booking.query().$promise
	    })
			.withPaginationType('full_numbers')
		*/

		/*
		$scope.$watch('bookings', function(newVal, oldVal) {	
			if (typeof newVal == 'object') {
				console.log('OK')

				$scope.dtOptions = DTOptionsBuilder.newOptions()
					.withOption('data', $scope.bookings)
			
	    	$scope.dtColumnsColumns = [
	      	DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
	      	DTColumnBuilder.newColumn('DatoForBesoeg').withTitle('Dato')
		    ]

				$timeout(function() {
					$compile(angular.element('#example').attr('datatable', ''))	
				})
			}
			
		})
		*/

  }]);
