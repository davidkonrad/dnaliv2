'use strict';

angular.module('dnalivApp')
  .controller('BookingCtrl', ['$scope', '$q', '$compile', '$location', '$http', 'Auth', 'Utils', 'Geo', 'Booking', 'Klasse', 'Lokalitet', 'TicketService',
			'Fag', 'Klassetrin', 'Resultat', 'Taxon', 'LokalitetModal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
			'DTDefaultOptions', '$modal', '$timeout', '$datepicker', 'SagsNo', 'Alert', 'Kommentar', 'KommentarModal', 'User', 'Db',  

	function ($scope, $q, $compile, $location, $http, Auth, Utils, Geo, Booking, Klasse, Lokalitet, TicketService,
						Fag, Klassetrin, Resultat, Taxon, LokalitetModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, 
						DTDefaultOptions,	$modal, $timeout, $datepicker, SagsNo, Alert, Kommentar, KommentarModal, User, Db) {


		if (!Auth.isLoggedIn()) {
	    $location.path('/');
		}

		var vm = this;

		$scope.statusOptions = [
				{ 'value': -1, 'text': 'Aflyst', 'class': 'btn-danger' }, 
				{ 'value': 0, 'text': 'Ikke bekræftet', 'class': 'btn-inverse' }, 
				{ 'value': 1, 'text': 'Bekræftet', 'class': 'btn-success' }
			];

		$scope.niveauOptions = [
				{ 'value': 1, 'text': 'A' }, 
				{ 'value': 2, 'text': 'B' }, 
				{ 'value': 3, 'text': 'C' }
			];

		$scope.eanOptions = [
				{ 'value': '<blank>', 'text': '<blank>' },
				{ 'value': 'Modtaget', 'text': 'Modtaget' }, 
				{ 'value': 'Kontaktet', 'text': 'Kontaktet' },  
				{ 'value': 'Regnskab', 'text': 'Regnskab' }
			];

		/**
			format and adds klasser, laerer etc attributes to the booking item
		*/
		$scope.initBookingInfo = function(booking) {
			booking.klasser = ''
			booking.laerer = ''
			booking.fag = ''
			booking.adresser = ''
			booking.postnr = ''
			booking.by = ''
			booking.kommune = ''
			booking.region = ''
			booking.telefon = ''
			booking.email = ''
			booking.antal_elever = 0
			booking.antal_laerer = 0
			booking.niveau = ''
			booking.kitTilsendt = ''
			booking.proeve_nr = ''
			booking.EANblanket = ''

			angular.element('#bookingTable').on('order.dt', function(event, settings, column, colSettings ) {
			})


			booking.Klasse.forEach(function(klasse) {
				//lærere
				if (booking.laerer != '') booking.laerer += "\n";
				booking.laerer += '<span class="no-break">' + klasse.laererNavn + '</span>'

				//adresse
				if (booking.adresser != '') booking.adresser += "\n";
				booking.adresser += '<span class="no-break">' + klasse.adresse + '</span>'

				//institutionsnavne
				if (booking.klasser != '') booking.klasser += "\n";
				booking.klasser += '<span class="no-break">' + klasse.institutionsnavn + '</span>'

				//akkumuleret fag
				if (booking.fag != '') booking.fag += '\n';
				var fag = klasse.fag;
				if (klasse.klassetrin) fag += ', ' + klasse.klassetrin
				booking.fag += '<span class="no-break">' + fag + '</span>'

				//postnr
				if (booking.postnr != '') booking.postnr += "\n";
				booking.postnr += klasse.postnr 

				//by
				if (booking.by != '') booking.by += "\n";
				booking.by += klasse.by ? klasse.by : ''

				//kommune
				if (booking.kommune != '') booking.kommune += "\n";
				booking.kommune += klasse.kommune

				//region
				if (booking.region != '') booking.region += "\n";
				booking.region += klasse.region

				//telefon
				if (booking.telefon != '') booking.telefon += "\n";
				booking.telefon += klasse.laererTlf

				//email
				if (booking.email != '') booking.email += "\n";
				booking.email += klasse.laererEmail

				//antal elever
				if (!isNaN(parseInt(klasse.antalElever))) booking.antal_elever += parseInt(klasse.antalElever)

				//antal laerer
				if (!isNaN(parseInt(klasse.antalLaerer))) booking.antal_laerer += parseInt(klasse.antalLaerer)

				//niveau
				if (booking.niveau != '') booking.niveau += "\n";
				booking.niveau += !klasse.niveau ? '' : klasse.niveau 

				//kit tilsendt
				if (booking.kitTilsendt != '') booking.kitTilsendt += "\n";
				booking.kitTilsendt += (!klasse.kitTilsendt ? '' : Utils.fixDate(klasse.kitTilsendt) ) 

				//EANblanket
				if (booking.EANblanket != '') booking.EANblanket += "\n";
				booking.EANblanket += !klasse.EANblanket ? '' : klasse.EANblanket

				//prøevenr
				booking.proeve_nr = ''

			})
			booking.besoegsDato_fixed = Utils.fixDate(booking.besoegsDato)
			booking.bookingDato_fixed = Utils.fixDate(booking.bookingDato)
				
		}

		vm.reloadData = function() {
			var loadDeferred = $q.defer();
			var items = [];
			var booking;

			Db.reloadBookings().then(function(bookings) {
				$scope.bookings = bookings

				for (var i=0, l=bookings.length; i<l; i++) {					
					booking = bookings[i]
					$scope.initBookingInfo(booking)
					items.push(booking)
					if (i == l-1) loadDeferred.resolve(items)
				}
			})
			return loadDeferred.promise
		}

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
						$scope.newSagsNo = sagsNo;
						$scope.bookingInstance.reloadData(function() {
							Utils.dtPerformSearch(sagsNo);
							$scope.showBooking(booking.booking_id);
						});
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
						$scope.bookingModal.hide();
						$scope.bookingInstance.reloadData();
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
		DTDefaultOptions.setLoadingTemplate('<img src="assets/images/ajax-loader.gif">')

		$scope.fromDate = Date.parse('1/1/2014')
		$scope.toDate = new Date()
		$scope.dateFilterActive = false
		$scope.bookingInstance = {}

		$scope.bookingOptions = DTOptionsBuilder.fromFnPromise(function() {
			return vm.reloadData()
    })
    .withPaginationType('full_numbers')
    .withDisplayLength(-1)
		.withDOM('lB<"dt-custom">frtip')
		.withOption('destroy', true)
		.withOption('stateSave', true)
		.withFixedHeader({
			alwaysCloneTop: true
		})
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
				className: 'btn btn-default btn-xs colvis-btn',
			}, { 
				extend : 'excelHtml5',
				text: '<i class="fa fa-download" title="Download aktuelle rækker som Excel-regneark"></i>&nbsp;Excel',
				filename: 'bookings', 
				className: 'btn btn-default btn-xs ml25px'
			}, { 
				text: 'Ny booking',
				className: 'btn btn-primary btn-xs ml25px mr25px',
				action: function ( e, dt, node, config ) {
					$scope.createBooking()
				}
			}
		])

		$('#bookingTable').on('click', 'tbody tr', function() {
			var booking = $scope.bookingInstance.DataTable.row(this).data()
			$scope.showBooking(booking.booking_id)
		})

		//log download to udtraek.log
		$('#bookingTable').on('buttons-action.dt', function(e, buttonApi, dataTable, node, config) {
			if (config.className.match(/buttons-excel/)) {
				var columns = Utils.visibleColumnNames($scope.bookingInstance);
				var user = Auth.getCurrentUser();
				var params = {
					userName: user.name,
					userEmail: user.email,
					filter: 'Filter:"'+$scope.bookingInstance.DataTable.search()+'"',
					type: 'Bookings',
					fields: columns
				}
				$http.post('api/extras/log', params ).then(function(res) {
					//console.log(res);
				})
			}
		});

				
		$scope.bookingColumns = [
      DTColumnBuilder.newColumn('booking_id').withTitle('#').withOption('visible', false),
      DTColumnBuilder.newColumn('sagsNo').withTitle('SagsNr'),
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
      DTColumnBuilder.newColumn('bookingDato_fixed').withOption('type', 'dna').withTitle('Bookingdato').withOption('visible', false),
      DTColumnBuilder.newColumn('besoegsDato_fixed').withOption('type', 'dna').withTitle('Besøgsdato'),
      DTColumnBuilder.newColumn('klasser').withOption('className', 'may-break').withOption('type', 'locale-compare').withTitle('Institutionsnavn'),
      DTColumnBuilder.newColumn('adresser').withOption('className', 'may-break').withOption('type', 'locale-compare').withTitle('Adresse').withOption('visible', false),
      DTColumnBuilder.newColumn('postnr').withOption('className', 'may-break').withTitle('Postnr').withOption('visible', false),
      DTColumnBuilder.newColumn('by').withOption('className', 'may-break').withTitle('By').withOption('visible', false),
      DTColumnBuilder.newColumn('kommune').withOption('className', 'may-break').withOption('type', 'locale-compare').withTitle('Kommune').withOption('visible', false),
      DTColumnBuilder.newColumn('region').withOption('className', 'may-break').withOption('type', 'locale-compare').withTitle('Region').withOption('visible', false),
      DTColumnBuilder.newColumn('fag').withOption('className', 'may-break').withTitle('Klasse'),
      DTColumnBuilder.newColumn('niveau').withTitle('Niveau').withOption('className', 'may-break').withOption('visible', false),
      DTColumnBuilder.newColumn('laerer').withOption('className', 'may-break px').withOption('type', 'locale-compare').withTitle('Lærerens navn'),
      DTColumnBuilder.newColumn('telefon').withOption('className', 'may-break').withTitle('Telefon').withOption('visible', false),
			DTColumnBuilder.newColumn('email').withOption('className', 'may-break').withTitle('Email').withOption('visible', false),
      DTColumnBuilder.newColumn('antal_elever').withTitle('#Elev.'),
      DTColumnBuilder.newColumn('antal_laerer').withTitle('#Lær.').withOption('visible', false),
      DTColumnBuilder.newColumn('kitTilsendt').withOption('className', 'may-break').withTitle('Kit tilsendt'),
      DTColumnBuilder.newColumn('EANblanket').withOption('className', 'may-break').withTitle('EAN-blanket').withOption('visible', false),
      DTColumnBuilder.newColumn('proeve_nr').withTitle('PrøeveID').withOption('visible', false),
      DTColumnBuilder.newColumn('created_userName').withTitle('Bruger').withOption('visible', false)
    ];  

		$scope.bookingColumnDefs = []


		/**
			bookings
		**/
		$scope.setBooking = function(booking_id) {
		  return $q(function(resolve, reject) {
				for (var i=0; i<$scope.bookings.length; i++) {
					if ($scope.bookings[i].booking_id == booking_id) {
						if ($scope.bookings[i].locked_by && $scope.bookings[i].locked_by != Auth.getCurrentUser().name) {
							Alert.show($scope, 'Bookingen er låst', 'Denne booking redigeres pt. af <strong>'+$scope.bookings[i].locked_by+'</strong>.', true)
						} else {
							$scope.booking = $scope.bookings[i];
							$scope.loadBookingKommentarer(booking_id);
							resolve(true);
						}
					}
				}
			})
		}

		$scope.lock = function(mode) {
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
					templateUrl: 'app/booking/booking.modal.html',
					backdrop: 'static',
					show: true,
					internalName: 'booking'
				})
				$scope.$on('modal.hide', function(e, target) {
					if (target.$options.internalName == 'booking') {
						$scope.bookingInstance.reloadData();
						$scope.lock(false);
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
					})
				}
			}
		});

		$scope.$watch('booking.besoegsDato', function(newVal, oldVal) {
			if (newVal == oldVal || !$scope.booking.booking_id) return;
			Booking.update({ id: $scope.booking.booking_id }, { besoegsDato: $scope.booking.besoegsDato }).$promise.then(function(booking) {
				$scope.booking.besoegsDato_fixed = Utils.fixDate($scope.booking.besoegsDato);
			});
		});

		$scope.$watch('booking.DatoForBooking', function(newVal, oldVal) {
			if (newVal == oldVal || !$scope.booking.booking_id) return
			Booking.update({ id: $scope.booking.booking_id }, { DatoForBooking: $scope.booking.DatoForBooking }).$promise.then(function(booking) {	
				$scope.booking.DatoForBooking_fixed = Utils.fixDate($scope.booking.DatoForBooking)
			})
		});

		/**
			klasser
		**/
		$scope.setKlasse = function(klasse_id) {
			$scope.booking.Klasse.forEach(function(klasse) {
				if (klasse.klasse_id == klasse_id) {
					$scope.klasse = klasse
				}
				/*
				Lokalitet.get({ id: klasse.lokalitet_id }).$promise.then(function(lokalitet) {
					$scope.klasse.Lokalitet = lokalitet
				})
				*/
			})
		}

		$scope.createKlasse = function() {
			var newKlasse = {
				booking_id: $scope.booking.booking_id,
				institutionsnavn: '<mangler>',
				status: 0
			}
			Klasse.save({ klasse_id: '' }, newKlasse ).$promise.then(function(klasse) {	
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
				templateUrl: 'app/booking/klasse.modal.html',
				backdrop: 'static',
				show: true,
				internalName: 'klasse'
			})
			$scope.$on('modal.show', function(e, target){
				if (target.$options.internalName == 'klasse') {

					$('#institution').typeahead({
						afterSelect: function (item) {
							//
						}, 
						items : 20,
						displayText: function(item) {
							return item.presentationString
						},
					  source: function(query, process) {
					    return $.getJSON('https://services.kortforsyningen.dk/Geosearch?search=*'+query+'*&resources=stednavne_v2&limit=100&ticket='+TicketService.get(), function(resp) {
								var newData = [],
										types = ['gymnasium', 'uddannelsescenter', 'privatskoleFriskole', 'folkeskole', 'universitet', 'specialskole']
								for (var i in resp.data) {
									if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
										newData.push(resp.data[i]);
									}
								}			
								return process(newData);		
					    })
					  }
					})
				}
			})

		}

		$scope.saveKlasse = function() {
			Klasse.update({ id: $scope.klasse.klasse_id }, $scope.klasse).$promise.then(function() {
				Utils.formReset('#klasse-form')
				Booking.get({ id: $scope.booking.booking_id }).$promise.then(function(booking) {
					$scope.booking = booking
					$scope.bookingInstance._renderer.rerender()
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

		/*
			booking noter
		*/
		$scope.loadBookingKommentarer = function(booking_id) {
			Kommentar.query( { where: { relation_id: booking_id, type_id: Utils.KOMMENTAR_TYPE.BOOKING }} ).$promise.then(function(kommentarer) {	
				$scope.booking.kommentarer = kommentarer
			})
		}

		$scope.addBookingKommentar = function() {
			KommentarModal.show($scope).then(function(kommentar) {	
				var kommentar = {
					kommentar: kommentar,
					type_id: Utils.KOMMENTAR_TYPE.BOOKING,
					relation_id: $scope.booking.booking_id,
					created_userName: Auth.getCurrentUser().name
				}
				Kommentar.save(kommentar).$promise.then(function() {	
					$scope.loadBookingKommentarer($scope.booking.booking_id)
				})
			})
		}	

		$scope.removeBookingKommentar = function(kommentar_id) {
			Alert.show($scope,'Slet notat', 'Slet note / kommentar - er du sikker?').then(function(confirm) {
				if (confirm) {
					Kommentar.delete({ id: kommentar_id}).$promise.then(function() {	
						$scope.loadBookingKommentarer($scope.booking.booking_id)
					})
				}
			})
		}

		
}]);

