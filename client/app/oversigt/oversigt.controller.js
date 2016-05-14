'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$compile', '$location', 'Utils', 'Geo', 'Booking', 'Klasse', 'Lokalitet', 
			'Fag', 'Klassetrin', 'Resultat', 'Taxon', 'Booking_taxon', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
			'$modal', '$timeout', '$datepicker', 'SagsNo', 'Alert',

	function ($scope, $compile, $location, Utils, Geo, Booking, Klasse, Lokalitet, 
						Fag, Klassetrin, Resultat, Taxon, Booking_taxon, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, 
						$modal, $timeout, $datepicker, SagsNo, Alert) {


		$scope.statusOptions = [
				{ "value": -1, "text": "Aflyst", "class": "btn-danger" }, 
				{ "value": 0, "text": "Ikke bekræftet", "class": "btn-inverse" }, 
				{ "value": 1, "text": "Bekræftet", "class": "btn-success" }
			]

		Klasse.query().$promise.then(function(klasser) {	
			$scope.klasser = klasser.map(function(klasse) {
				return klasse
			})
		})
	
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
					Booking.save({ booking_id: '' }, { sagsNo: sagsNo, status: 0 }).$promise.then(function(booking) {	
						$scope.newSagsNo = sagsNo
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
      DTColumnBuilder.newColumn('DatoForBooking').withOption('type', 'date').withTitle('Dato for booking'),
      DTColumnBuilder.newColumn('DatoForBesoeg').withOption('type', 'date').withTitle('Dato for besøg'),
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
			$scope.bookings.forEach(function(booking) {
				if (booking.booking_id == booking_id) {
					$scope.booking = booking
					//$scope.setBookingKlasser(booking.booking_id)
					//$scope.setBookingLokalitet(booking.lokalitet_id)
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

		$scope.showBooking = function(booking_id) {
			$scope.setBooking(booking_id)
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/booking.modal.html',
				backdrop: 'static',
				show: true
			})
			//$location.path('bookings/'+sagsNo)
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
						$scope.bookingInstance.rerender()
					})
				}
			}
		})

		$scope.$watch('booking.DatoForBesoeg', function(newVal, oldVal) {
			if (newVal == oldVal || oldVal == undefined) return
			Booking.update({ id: $scope.booking.booking_id }, { DatoForBesoeg: $scope.booking.DatoForBesoeg }).$promise.then(function(booking) {	
				$scope.booking.DatoForBesoeg_fixed = Utils.fixDate($scope.booking.DatoForBesoeg)
				$scope.bookingInstance.rerender()
			})
		})

		$scope.$watch('booking.DatoForBooking', function(newVal, oldVal) {
			if (newVal == oldVal || oldVal == undefined) return
			Booking.update({ id: $scope.booking.booking_id }, { DatoForBooking: $scope.booking.DatoForBooking }).$promise.then(function(booking) {	
				$scope.booking.DatoForBooking_fixed = Utils.fixDate($scope.booking.DatoForBooking)
				$scope.bookingInstance.rerender()
			})
		})

		/**
			klasser
		**/
		$scope.setKlasse = function(klasse_id) {
			/*
			$scope.klasser.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
					//$scope.setKlasseLokalitet()
				}
			})
			*/
			$scope.booking.Klasse.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
					//$scope.setKlasseLokalitet()
				}
			})
			
		}

		$scope.createKlasse = function() {
			Klasse.save({ klasse_id: '' }, { booking_id : $scope.booking.booking_id, institutionsnavn: 'ikke sat' }).$promise.then(function(klasse) {	
				$scope.booking.Klasse.push(klasse)
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
			booking taxon
		**/
		$scope.showTaxon = function() {
			$scope.loadBookingTaxons()
			$modal({
				scope: $scope,
				templateUrl: 'app/oversigt/taxon.modal.html',
				backdrop: 'static',
				show: true
			})
		}

		$scope.loadBookingTaxons = function() {
			Booking_taxon.query({ booking_id: $scope.booking_booking_id }).$promise.then(function(booking_taxons) {	
				$scope.bookingTaxons = []
				booking_taxons.forEach(function(item) {
					if (item.booking_id == $scope.booking.booking_id) $scope.bookingTaxons.push(item)
				})
				$scope.loadTaxons()
			})
		}

		$scope.taxonIsIncluded = function(taxon_id) {
			var result =  { is_included: false, booking_taxon_id: false };
			for (var i=0;i<$scope.bookingTaxons.length; i++) {
				var item = $scope.bookingTaxons[i];
				if (item.taxon_id == taxon_id) {
					result.is_included = item.is_included;
					result.booking_taxon_id = item.booking_taxon_id;
					return result;
				}
			}
			return result;
		}

		$scope.loadTaxons = function() {
			Taxon.query().$promise.then(function(taxons) {	
				$scope.taxons = {};
				taxons.forEach(function(taxon) {
					if (!$scope.taxons[taxon.taxon_artsgruppe]) $scope.taxons[taxon.taxon_artsgruppe] = [];
					$scope.taxons[taxon.taxon_artsgruppe].push({ 
						taxon_id: taxon.taxon_id,
						taxon_navn: taxon.taxon_navn, 
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_basisliste: taxon.taxon_basisliste,
						booking: $scope.taxonIsIncluded(taxon.taxon_id)
					})
				})
			})
		}

		$scope.bookingTaxonToggle = function(art) {
			if (art.booking.is_included) {
				if (art.booking.booking_taxon_id) {
					Booking_taxon.update({ booking_taxon_id: art.booking.booking_taxon_id, is_included: true })
				} else {
					Booking_taxon.save({ booking_taxon_id: ''}, { booking_id: $scope.booking.booking_id, taxon_id: art.taxon_id })
				}
			} else {
				Booking_taxon.update({ booking_taxon_id: art.booking.booking_taxon_id, is_included: false})
			}
		}

		Booking_taxon.query({ booking_id: $scope.booking_booking_id} ).$promise.then(function(booking_taxons) {	
			//console.log('pt', booking_taxons);
		})


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

