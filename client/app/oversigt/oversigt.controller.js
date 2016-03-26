'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$location', 'Utils', 'Booking', 'Klasse', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$modal',  
		function ($scope, $location, Utils, Booking, Klasse, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $modal) {
		
		Klasse.query().$promise.then(function(klasser) {	
			$scope.klasser = klasser.map(function(klasse) {
				return klasse
			})
			Booking.query().$promise.then(function(bookings) {	
				$scope.bookings = bookings.map(function(booking) {
					booking.klasser = $scope.getKlasser(booking.booking_id)
					booking.status = $scope.getStatus(booking.booking_id)
					return Utils.getObj(booking)
				})
			})
		})

		$scope.getStatus = function(booking_id) {
			var status = 0;
			$scope.klasser.forEach(function(klasse) {
				if (klasse.booking_id == booking_id) {
					status = klasse.status
				}
			})
			return status
		}

		$scope.getKlasser = function(booking_id) {
			var klasser = '';
			$scope.klasser.forEach(function(klasse) {
				if (klasse.booking_id == booking_id) {
					if (klasser != '') klasser += ' · ';
					klasser += klasse.klassetrin+' '+klasse.fag+', '+klasse.institutionsnavn
				}
			})
			return klasser
		}
		
		$scope.bookingOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(50)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				document.querySelector('tbody').setAttribute('title', 'Dobbeltklik for at redigere')
			})
			.withLanguage(Utils.dataTables_daDk)

		$scope.bookingColumns = [
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('status').withTitle('Status').renderWith(function(data, type, full) {
				var s = '';
				switch(parseInt(data)) {
					case -1: s = '<button class="btn btn-xs btn-status btn-danger">Aflyst</button>'; break;
					case 1: s = '<button class="btn btn-xs btn-status btn-success">Bekræftet</button>'; break;
					default : s = '<button class="btn btn-xs btn-status btn-inverse">Ikke bekræftet</button>'; break;
				}
        return s;
			}),
      DTColumnBuilder.newColumn('DatoForBooking').withTitle('Dato for booking'),
      DTColumnBuilder.newColumn('DatoForBesoeg').withTitle('Dato for besøg'),
      DTColumnBuilder.newColumn('klasser').withTitle('Klasser')
    ];  

		$scope.bookingColumnDefs = [
      DTColumnDefBuilder.newColumnDef([2,3]).renderWith(function(data, type, full) {
				var d = new Date(data);
				if (!isNaN(d.getTime())) {
					return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + d.getFullYear();
				} else {
					return '?'
				}
			})
    ]

		$scope.setBooking = function(sagsNo) {
			$scope.bookings.forEach(function(booking) {
				if (booking.sagsNo == sagsNo) {
					$scope.booking = booking
					$scope.setBookingKlasser(booking.booking_id)
					return
				}
			})
		}
			
		$scope.setBookingKlasser = function(booking_id) {
			$scope.bookingKlasser = []
			$scope.klasser.forEach(function(klasse) {	
				if (klasse.booking_id == booking_id) {
					klasse.edited = false
					$scope.bookingKlasser.push(klasse)
				}
			})
		}

		$scope.showBooking = function(sagsNo) {
			$scope.setBooking(sagsNo)
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/booking.modal.html',
				backdrop: 'static',
				show: true
			})
			//$location.path('bookings/'+sagsNo)
		}

		$scope.showKlasse = function(klasse_id) {
			console.log(klasse_id);
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/klasse.modal.html',
				backdrop: 'static',
				show: true
			})
		}

}]);

