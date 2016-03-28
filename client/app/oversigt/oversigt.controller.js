'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$location', 'Utils', 'Geo', 'Booking', 'Klasse', 'Lokalitet', 
															'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$modal', '$timeout',  

	function ($scope, $location, Utils, Geo, Booking, Klasse, Lokalitet, 
						DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $modal, $timeout) {

		$scope.statusOptions = [
				{ "value": -1, "text": "Aflyst", "class": "btn-danger" }, 
				{ "value": 0, "text": "Ikke bekræftet", "class": "btn-inverse" }, 
				{ "value": 1, "text": "Bekræftet", "class": "btn-success" }
			]

		Klasse.query().$promise.then(function(klasser) {	
			$scope.klasser = klasser.map(function(klasse) {
				return klasse
			})
			Booking.query().$promise.then(function(bookings) {	
				$scope.bookings = bookings.map(function(booking) {
					booking.klasser = $scope.getKlasser(booking.booking_id)
					booking.status = $scope.getStatus(booking.booking_id)

					//instead of render methods, improve load speed
					booking.DatoForBesoeg_fixed = Utils.fixDate(booking.DatoForBesoeg)
					booking.DatoForBooking_fixed = Utils.fixDate(booking.DatoForBooking)

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
					if (klasser != '') klasser += '\n';
					klasser += klasse.klassetrin+' '+klasse.fag+', '+klasse.institutionsnavn
				}
			})
			return klasser
		}
		
		$scope.bookingOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				var input = document.querySelector('.dataTables_filter input')
				input.className += 'form-control inject-control'
				input.style.padding = '5px'
				input.placeholder = 'skriv ..'
				//input.setFocus() ??? 
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
      DTColumnBuilder.newColumn('DatoForBooking').withOption('type', 'date').withTitle('Dato for booking'),
      DTColumnBuilder.newColumn('DatoForBesoeg').withOption('type', 'date').withTitle('Dato for besøg'),
      DTColumnBuilder.newColumn('klasser').withTitle('Klasser')
    ];  

		$scope.bookingColumnDefs = []


		/**
			bookings
		**/
		$scope.setBooking = function(sagsNo) {
			$scope.bookings.forEach(function(booking) {
				if (booking.sagsNo == sagsNo) {
					$scope.booking = booking
					$scope.setBookingKlasser(booking.booking_id)
					$scope.setBookingLokalitet(booking.lokalitet_id)
					return
				}
			})
		}

		$scope.saveBooking = function() {
			Booking.update({ booking_id: $scope.booking.booking_id }, $scope.booking)
			//update view fields
			$scope.booking.DatoForBesoeg_fixed = Utils.fixDate($scope.booking.DatoForBesoeg)
			$scope.booking.DatoForBooking_fixed = Utils.fixDate($scope.booking.DatoForBooking)
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

		$scope.setBookingLokalitet = function(lokalitet_id) {
			$scope.lokalitet = {
				locked: false,
				showMarker: true,
				showPolygon: true,
				showPopup: true
			}
			$scope.lokaliteter.forEach(function(lokalitet) {
				if (lokalitet.lokalitet_id == lokalitet_id) {
					$scope.lokalitet = lokalitet
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



		/**
			klasser
		**/
		$scope.setKlasse = function(klasse_id) {
			$scope.klasser.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
					return
				}
			})
		}

		$scope.showKlasse = function(klasse_id) {
			$scope.setKlasse(klasse_id)
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/klasse.modal.html',
				backdrop: 'static',
				show: true
			})
		}


		/**
			Lokalitet
		**/
		$scope.lokalitet = {}
		$scope.map = false
		$scope.wkt = new Wkt.Wkt()

		Lokalitet.query().$promise.then(function(lokaliteter) {	
			$scope.lokaliteter = lokaliteter.map(function(lokalitet) {
				return lokalitet
			})
		})

		$scope.showLokalitet = function(lokalitet_id) {
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/lokalitet.modal.html',
				backdrop: 'static',
				show: true
			})
			$timeout(function() {
				initWetland($scope, Utils, Geo)
				initializeMap($scope, Utils, Geo)
			}, 250)
		}
	
		$scope.saveLokalitet = function() {
			if ($scope.lokalitetLoaded()) {
				Lokalitet.update( { lokalitet_id: $scope.lokalitet.lokalitet_id }, $scope.lokalitet)
			} else {
				Lokalitet.save( { lokalitet_id: '' }, $scope.lokalitet).$promise.then(function(lokalitet) {	
					$scope.booking.lokalitet_id = lokalitet.lokalitet_id
					Booking.update({ booking_id: $scope.booking.booking_id }, $scope.booking)
					$scope.lokalitet.locked = true
				})
			}		
		}

		$scope.lokalitetLoaded = function() {
			return typeof $scope.lokalitet.lokalitet_id == 'number'
		}

}]);

