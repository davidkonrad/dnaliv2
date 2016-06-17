'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$q', '$compile', '$location', 'Auth', 'Utils', 'Geo', 'Booking', 'Klasse', 'Lokalitet', 
			'Fag', 'Klassetrin', 'Resultat', 'Taxon', 'LokalitetModal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
			'$modal', '$timeout', '$datepicker', 'SagsNo', 'Alert', 'Kommentar', 'KommentarModal', 'User', 

	function ($scope, $q, $compile, $location, Auth, Utils, Geo, Booking, Klasse, Lokalitet, 
						Fag, Klassetrin, Resultat, Taxon, LokalitetModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, 
						$modal, $timeout, $datepicker, SagsNo, Alert, Kommentar, KommentarModal, User) {


		$scope.statusOptions = [
				{ "value": -1, "text": "Aflyst", "class": "btn-danger" }, 
				{ "value": 0, "text": "Ikke bekræftet", "class": "btn-inverse" }, 
				{ "value": 1, "text": "Bekræftet", "class": "btn-success" }
			]

		/**
			format and adds klasser, laerer etc attributes to the booking item
		*/
		$scope.initBookingInfo = function(booking) {
			booking.klasser = ''
			booking.laerer = ''
			booking.fag = ''
			booking.antal_elever = 0

			booking.Klasse.forEach(function(klasse) {
				if (booking.laerer != '') booking.laerer += '\n';
				booking.laerer += klasse.laererNavn

				if (booking.klasser != '') booking.klasser += '\n';
				booking.klasser += klasse.institutionsnavn

				if (booking.fag != '') booking.fag += '\n';
				booking.fag += klasse.fag
				if (klasse.klassetrin) booking.fag += ', ' + klasse.klassetrin

				if (!isNaN(parseInt(klasse.antalElever))) booking.antal_elever += parseInt(klasse.antalElever)

				//update status with klasse status
				//booking.status = klasse.status
			})
			booking.DatoForBesoeg_fixed = Utils.fixDate(booking.DatoForBesoeg)
			booking.DatoForBooking_fixed = Utils.fixDate(booking.DatoForBooking)
		}

		$scope.reloadData = function() {
			Booking.query().$promise.then(function(bookings) {	
				$scope.bookings = bookings.map(function(booking) {
					$scope.initBookingInfo(booking)
					return Utils.getObj(booking)
				})
			})
		}
		$scope.reloadData()

		$scope.createBooking = function() {
			SagsNo.create($scope).then(function(sagsNo) {
				if (sagsNo) {
					var booking = {
						sagsNo: sagsNo,
						status: 0,
						periode: 0,
						aar_periode: 0 
					}
					Booking.save({ booking_id: '' }, booking).$promise.then(function(booking) {	
						$scope.newSagsNo = sagsNo
						$scope.reloadData()
					})
				}
			})
		}

		$scope.deleteBooking = function() {
			Alert.show($scope, 'Slet Booking?', 'Er du sikker på du slette booking <b>'+$scope.booking.sagsNo+'</b> samt evt. tilknyttede institutioner?').then(function(confirm) {	
				if (confirm) {
					$scope.booking.Klasse.forEach(function(klasse) {
						Klasse.delete({ id: klasse.klasse_id })
					})
					Booking.delete({ id: $scope.booking.booking_id }).$promise.then(function() {
						$scope.bookingModal.hide()
						$scope.reloadData()
					})
				}
			})
		}

		$scope.changeSagsNo = function() {
			SagsNo.change($scope, $scope.booking.sagsNo).then(function(sagsNo) {
				if (sagsNo) {
					Booking.update({ id: $scope.booking.booking_id }, { sagsNo: sagsNo }).$promise.then(function(booking) {	
						$scope.booking.sagsNo = sagsNo
					})
				}
			})
		}

		/* dataTable */
		$scope.fromDate = Date.parse('1/1/2014')
		$scope.toDate = new Date()
		$scope.dateFilterActive = false
		$scope.bookingInstance = {}

		$scope.bookingOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('lB<"dt-custom">frtip')
			.withOption('destroy', true)
			.withOption('initComplete', function() {
				Utils.dtNormalizeLengthMenu()
				Utils.dtNormalizeButtons()
				Utils.dtNormalizeSearch()
				
				$timeout(function() {
					$scope.$apply($compile(angular.element('.dt-buttons'))($scope))
				}, 200)

				//set filter to newly inserted sagsNo
				if ($scope.newSagsNo) {
					Utils.dtPerformSearch($scope.newSagsNo)
					$scope.newSagsNo = false
				}

				//remove any previous set global filters
				$.fn.dataTable.ext.search = []
				//custom date filter
				$.fn.dataTable.ext.search.push(function( settings, data, dataIndex ) {
					if (!$scope.dateFilterActive) return true
					var date = Date.parse(data[2])
					return (date >= $scope.fromDate && date <= $scope.toDate)
				})
				$scope.$on('$destroy', function() { 
					$.fn.dataTable.ext.search.pop()
				})

				$scope.$watchGroup(['fromDate', 'toDate', 'dateFilterActive'], function() {
					if ($scope.finalized) {
						$scope.bookingInstance.DataTable.draw()
					}
				})

				//reattach date-filter element
				$timeout(function() {
					$('#date-filter').detach().appendTo('.dt-custom').show()
					$scope.finalized = true
				}, 1000)
			})
			.withLanguage(Utils.dataTables_daDk)
			.withButtons([ 
				{ extend : 'colvis',
					overlayFade: 0,
					text: 'Vis kolonner &nbsp;<i class="fa fa-sort-down" style="position:relative;top:-3px;"></i>',
					className: 'btn btn-default btn-xs colvis-btn'
				}, { 
					extend : 'excelHtml5',
					text: '<i class="fa fa-download" title="Download aktuelle rækker som Excel-regneark"></i>&nbsp;Excel',
					filename: 'bookings', 
					className: 'btn btn-default btn-xs ml25px'
				},{ 
					extend : 'pdfHtml5',
					text: '<i class="fa fa-download" title="Download aktuelle rækker som PDF"></i>&nbsp;PDF',
					filename: 'bookings', 
					className: 'btn btn-default btn-xs'
				}, { 
					text: 'Ny booking',
					className: 'btn btn-primary btn-xs ml25px mr25px',
					action: function ( e, dt, node, config ) {
						$scope.createBooking()
 					}
				}
			])

		$scope.bookingColumns = [
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('status').withTitle('Status').renderWith(function(data, type, full) {
				if (type == 'display') {
					var s = '';
					switch(parseInt(data)) {
						case -1: s = '<button class="btn btn-xs btn-status btn-danger">Aflyst</button>'; break;
						case 1: s = '<button class="btn btn-xs btn-status btn-success">Bekræftet</button>'; break;
						default : s = '<button class="btn btn-xs btn-status btn-inverse">Ikke bekræftet</button>'; break;
					}
  	      return s;
				} else {
					return data
				}
			}),
      DTColumnBuilder.newColumn('DatoForBooking').withOption('type', 'dna').withTitle('Dato for booking'),
      DTColumnBuilder.newColumn('DatoForBesoeg').withOption('type', 'dna').withTitle('Dato for besøg'),
      DTColumnBuilder.newColumn('klasser').withTitle('Klasse'),
      DTColumnBuilder.newColumn('fag').withTitle('Fag'),
      DTColumnBuilder.newColumn('laerer').withTitle('Lærer'),
      DTColumnBuilder.newColumn('antal_elever').withTitle('#Elev')
    ];  

		$scope.bookingColumnDefs = []


		/**
			bookings
		**/
		$scope.setBooking = function(booking_id) {
		  return $q(function(resolve, reject) {
				for (var i=0; i<$scope.bookings.length; i++) {
					if ($scope.bookings[i].booking_id == booking_id) {
						if ($scope.bookings[i].locked_by) {
							Alert.show($scope, 'Bookingen er låst', 'Denne booking redigeres pt. af <strong>'+$scope.bookings[i].locked_by+'</strong>.', true)
						} else {
							$scope.booking = $scope.bookings[i]
							resolve(true)
						}
					}
				}
			})
		}

		$scope.lock = function(mode) {
			//console.log('lock', $scope.booking)
			if (!$scope.booking.booking_id) return
			var booking = mode ? { locked_by: Auth.getCurrentUser().name } : { locked_by: null }
			Booking.update({ id: $scope.booking.booking_id }, booking)
		}
		
		$scope.saveBooking = function() {
			Booking.update({ booking_id: $scope.booking.booking_id }, $scope.booking)
			//update view fields
			$scope.booking.DatoForBesoeg_fixed = Utils.fixDate($scope.booking.DatoForBesoeg)
			$scope.booking.DatoForBooking_fixed = Utils.fixDate($scope.booking.DatoForBooking)
		}
			
		$scope.showBooking = function(booking_id) {
			$scope.setBooking(booking_id).then(function() {
				$scope.lock(true)
				$scope.bookingModal = $modal({
					scope: $scope,
					templateUrl: 'app/oversigt/booking.modal.html',
					backdrop: 'static',
					show: true,
					internalName: 'booking'
				})
				$scope.$on('modal.hide', function(e, target){
					if (target.$options.internalName == 'booking') {
						//console.log('hidfe', $scope.booking)
						$scope.lock(false)
						//$scope.resetBooking()
					}
				})
			})
		}

		$scope.resetBooking = function() {
			$scope.booking = {}
		}

		//update booking modal status select with appropriate class
		$scope.$watch('booking.status', function(newVal, oldVal) {
			if (newVal == oldVal) return
			for (var s in $scope.statusOptions) {
				if ($scope.statusOptions[s].value == newVal) {
					$scope.statusSelectClass = $scope.statusOptions[s].class
					if (oldVal == undefined) return
					Booking.update({ id: $scope.booking.booking_id }, { status: $scope.booking.status }).$promise.then(function(booking) {	
						//$scope.bookingInstance.rerender()
					})
				}
			}
		})

		$scope.$watch('booking.DatoForBesoeg', function(newVal, oldVal) {
			if (newVal == oldVal || !$scope.booking.booking_id) return
			Booking.update({ id: $scope.booking.booking_id }, { DatoForBesoeg: $scope.booking.DatoForBesoeg }).$promise.then(function(booking) {	
				$scope.booking.DatoForBesoeg_fixed = Utils.fixDate($scope.booking.DatoForBesoeg)
			})
		})

		$scope.$watch('booking.DatoForBooking', function(newVal, oldVal) {
			if (newVal == oldVal || !$scope.booking.booking_id) return
			Booking.update({ id: $scope.booking.booking_id }, { DatoForBooking: $scope.booking.DatoForBooking }).$promise.then(function(booking) {	
				$scope.booking.DatoForBooking_fixed = Utils.fixDate($scope.booking.DatoForBooking)
			})
		})

		/**
			klasser
		**/
		$scope.setKlasse = function(klasse_id) {
			$scope.booking.Klasse.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
				}
				Lokalitet.get({ id: klasse.lokalitet_id }).$promise.then(function(lokalitet) {
					$scope.klasse.Lokalitet = lokalitet
				})
			})
		}

		$scope.createKlasse = function() {
			Klasse.save({ klasse_id: '' }, { booking_id : $scope.booking.booking_id, institutionsnavn: 'ikke sat' }).$promise.then(function(klasse) {	
				$scope.booking.Klasse.push(klasse)
			})
		}

		$scope.loadKlasseKommentarer = function(klasse_id) {
			Kommentar.query( { where: { relation_id: klasse_id, type_id: Utils.KOMMENTAR_TYPE.KLASSE }} ).$promise.then(function(kommentarer) {	
				$scope.klasse.kommentarer = kommentarer
			})
		}

		$scope.addKlasseKommentar = function() {
			KommentarModal.show($scope).then(function(kommentar) {	
				var kommentar = {
					kommentar: kommentar,
					type_id: Utils.KOMMENTAR_TYPE.KLASSE,
					relation_id: $scope.klasse.klasse_id,
					created_userName: Auth.getCurrentUser().name
				}
				Kommentar.save(kommentar).$promise.then(function() {	
					$scope.loadKlasseKommentarer($scope.klasse.klasse_id)
				})
			})
		}	

		$scope.removeKlasseKommentar = function(kommentar_id) {
			Alert.show($scope,'Slet notat', 'Slet note / kommentar - er du sikker?').then(function(confirm) {
				if (confirm) {
					Kommentar.delete({ id: kommentar_id}).$promise.then(function() {	
						$scope.loadKlasseKommentarer($scope.klasse.klasse_id)
					})
				}
			})
		}

		$scope.showKlasseLokalitet = function(lokalitet_id) {
			LokalitetModal.show($scope, lokalitet_id).then(function(success) {	
				console.log(success)
			})
		}

		$scope.deleteKlasse = function(klasse_id, institutionsnavn) {
			Alert.show($scope, 'Slet klasse / institution?', 'Er du sikker på du vil fjerne "<b>'+institutionsnavn+'</b>" fra denne booking?').then(function(confirm) {	
				if (confirm) {
					Klasse.delete({ id: klasse_id }).$promise.then(function() {
						Booking.get({ id: $scope.booking.booking_id }).$promise.then(function(booking) {
							$scope.klasseModal.hide()
							$scope.booking = booking
						})
					})
				}
			})
		}
	
		$scope.showKlasse = function(klasse_id) {
			$scope.setKlasse(klasse_id)
			$scope.loadKlasseKommentarer(klasse_id)
			$scope.klasseModal = $modal({
				scope: $scope,
				templateUrl: 'app/oversigt/klasse.modal.html',
				backdrop: 'static',
				show: true
			})
		}

		$scope.saveKlasse = function() {
			Klasse.update({ id: $scope.klasse.klasse_id }, $scope.klasse).$promise.then(function() {
				Utils.formReset('#klasse-form')
				Booking.get({ id: $scope.booking.booking_id }).$promise.then(function(booking) {
					$scope.booking = booking
				})
			})
		}
		
		$scope.klasseIsEdited = function() {
			return Utils.formIsEdited('#klasse-form')
		}


		/**
			lookup lists
		**/
		Fag.query().$promise.then(function(fag) {	
			$scope.fag = fag.map(function(f) {
				return f
			})
		})

		Klassetrin.query().$promise.then(function(klassetrin) {	
			$scope.klassetrin = klassetrin.map(function(k) {
				return k
			})
		})

		
}]);

