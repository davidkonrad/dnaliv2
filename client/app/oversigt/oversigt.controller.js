'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$location', 'Utils', 'Geo', 'Booking', 'Klasse', 'Lokalitet', 'Fag', 'Klassetrin', 
			'Resultat', 'Taxon', 'Booking_taxon', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$modal', '$timeout', 
			'$datepicker',

	function ($scope, $location, Utils, Geo, Booking, Klasse, Lokalitet, Fag, Klassetrin, Resultat, Taxon, Booking_taxon,
						DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $modal, $timeout, $datepicker) {


		$scope.statusOptions = [
				{ "value": -1, "text": "Aflyst", "class": "btn-danger" }, 
				{ "value": 0, "text": "Ikke bekræftet", "class": "btn-inverse" }, 
				{ "value": 1, "text": "Bekræftet", "class": "btn-success" }
			]

		$scope.reloadData = function() {
			Klasse.query().$promise.then(function(klasser) {	
				$scope.klasser = klasser.map(function(klasse) {
					return klasse
				})
				Booking.query().$promise.then(function(bookings) {	
					$scope.bookings = bookings.map(function(booking) {
						booking.klasser = $scope.getKlasser(booking.booking_id)
						booking.laerer = $scope.getLaerer(booking.booking_id)
						booking.status = $scope.getStatus(booking.booking_id)
	
						//instead of render methods, improve load speed
						booking.DatoForBesoeg_fixed = Utils.fixDate(booking.DatoForBesoeg)
						booking.DatoForBooking_fixed = Utils.fixDate(booking.DatoForBooking)

						return Utils.getObj(booking)
					})
				})
			})
		}
		$scope.reloadData()

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
					klasser += klasse.institutionsnavn
				}
			})
			return klasser
		}

		$scope.getLaerer = function(booking_id) {
			var laerer = '';
			$scope.klasser.forEach(function(klasse) {
				if (klasse.booking_id == booking_id) {
					if (laerer != '') laerer += '\n';
					laerer += klasse.laererNavn
				}
			})
			return laerer
		}
		
		$scope.createBooking = function() {
			var sagsNo = prompt('SagsNo: ', '');
			if (sagsNo != '') Booking.save({ booking_id: '' }, { sagsNo: sagsNo }).$promise.then(function(booking) {	
				$scope.newSagsNo = sagsNo
				$scope.reloadData()
			})
		}

		/* dataTable */
		$scope.fromDate = Date.parse('1/1/2014')
		$scope.toDate = new Date()
		$scope.dateFilterActive = true
		$scope.bookingInstance = {}

		$scope.bookingOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
			.withDOM("<'row'<'col-sm-2'l><'col-sm-7 dt-custom'><'col-sm-3'f>>" +
							 "<'row'<'col-sm-12'tr>>" +
							 "<'row'<'col-sm-5'i><'col-sm-7'p>>")
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				var input = document.querySelector('.dataTables_filter input')
				input.className += 'form-control inject-control'
				input.style.padding = '5px'
				input.placeholder = 'skriv ..'

				$scope.inputFilter = input

				//set filter to newly inserted sagsno
				if ($scope.newSagsNo) {
					input.value = $scope.newSagsNo
					$(input).trigger('keyup')
					$scope.newSagsNo = false
				}

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
					$('#date-filter').detach().appendTo('.dt-custom')
					$scope.finalized = true
				}, 600)

				document.querySelector('tbody').setAttribute('title', 'Dobbeltklik for at redigere')
			})
			.withLanguage(Utils.dataTables_daDk)
			/*
			 .withButtons([
            'colvis',
            'copy',
            'print',
            'excel',
            {
                text: 'Some button',
                key: '1',
                action: function (e, dt, node, config) {
                    alert('Button activated');
                }
            }
        ]);
			*/

		/*
table.buttons().container()
    .appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );
		*/
		
		$timeout(function() {
			//console.log($scope.bookingInstance)
		},150)

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
      DTColumnBuilder.newColumn('klasser').withTitle('Klasse'),
      DTColumnBuilder.newColumn('laerer').withTitle('Lærer')
    ];  

		$scope.bookingColumnDefs = []


		/**
			bookings
		**/
		$scope.setBooking = function(booking_id) {
			$scope.bookings.forEach(function(booking) {
				if (booking.booking_id == booking_id) {
					$scope.booking = booking
					$scope.setBookingKlasser(booking.booking_id)
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

		/*
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
		*/
			
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



		/**
			klasser
		**/
		$scope.setKlasse = function(klasse_id) {
			$scope.klasser.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
					$scope.setKlasseLokalitet()
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

		$scope.saveKlasse = function() {
			Klasse.update({ klasse_id: $scope.klasse.klasse_id }, $scope.klasse)
			var form = document.querySelector('#klasse-form');
			if (form) {
				var i=0, inputs = form.querySelectorAll('input');
				for (i; i<inputs.length; i++) {
					angular.element(inputs[i]).removeClass('ng-dirty')
				}
			}
		}

		$scope.setKlasseLokalitet = function() {
			$scope.klasse.lokalitetNavn = 'Samme som booking lokalitet'
			$scope.lokalitet = {
				locked: false,
				showMarker: true,
				showPolygon: true,
				showPopup: true
			}
			if (!$scope.klasse.lokalitet_id) return
			$scope.lokaliteter.forEach(function(lokalitet) {
				if (lokalitet.lokalitet_id == $scope.klasse.lokalitet_id) {
					$scope.klasse.lokalitetNavn = lokalitet.presentationString
					$scope.lokalitet = lokalitet
				}
			})
		}

		$scope.klasseIsEdited = function() {
			var form = document.querySelector('#klasse-form');
			if (form) {
				var i=0, inputs = form.querySelectorAll('input');
				for (i; i<inputs.length; i++) {
					if (angular.element(inputs[i]).hasClass('ng-dirty')) return true
				}
			}
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

