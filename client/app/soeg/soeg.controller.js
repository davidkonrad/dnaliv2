'use strict';

angular.module('dnalivApp')
  .controller('SoegCtrl', ['ItemsService', '$scope', '$http', '$timeout', '$modal', 'User', 'Utils', 'Alert', 'Proeve', 'Booking', 
			'Resultat', 'Resultat_item', 'System_user', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'Db',

	 function (ItemsService, $scope, $http, $timeout, $modal, User, Utils, Alert, Proeve, Booking, 
			Resultat, Resultat_item, System_user, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, Db) {

		Db.init()


		/*
		Db.reloadResultater().then(function(resultater) {	
			function getResultat(result_id) {
				for (var i=0, l=resultater.length; i<l) {
					if (resultater[i].resultat_id == resultat_id) return resultater[i]
				}
			}
			Db.reloadResultat_items().then(function(resultat_items) {	
				$scope.resultat_items = resultat_items.map(function(resultat_item) {
					resultat_item.Resultat = getResultat(resultat_item.resultat_id
				$scope.resultat_items = resultat_items
			})
		})
		*/

		//prøveData lookups
		Db.reloadProever().then(function(proever) {	
			/*
			$scope.proeveIdArray = []
			$scope.indsamlerArray = []
			proever.forEach(function(proeve) {
				//console.log(proeve.indsamlerNavn, $scope.indsamlerArray)
				if (!~$scope.proeveIdArray.indexOf(proeve.proeve_nr)) $scope.proeveIdArray.push(proeve.proeve_nr)
				if (!~$scope.indsamlerArray.indexOf(proeve.indsamlerNavn)) $scope.indsamlerArray.push(proeve.indsamlerNavn)
			})
			*/
			var proeveIdArray = [], 
					indsamlerArray = [],
					indsamlerInstitutionArray = [];

			function checkValue(array, value) {
				if (value && !~array.indexOf(value)) array.push(value)
			}

			for (var i=0, l=proever.length; i<l; i++) {
				if (!~proeveIdArray.indexOf(proever[i].proeve_nr)) proeveIdArray.push(proever[i].proeve_nr)
				
				checkValue(indsamlerArray, proever[i].indsamlerNavn)
				checkValue(indsamlerInstitutionArray, proever[i].indsamlerInstitution)

				if (i==(l-1)) {
					$scope.indsamlerArray = indsamlerArray.sort()
					$scope.indsamlerInstitutionArray = indsamlerInstitutionArray.sort()
					$scope.proeveIdArray = proeveIdArray.sort()
				}
			}
		})

		//analalyseData lookups
		Db.reloadBookings().then(function(bookings) {	

			$scope.sagsNoArray = bookings.map(function(booking) {
				return booking.sagsNo
			})

			//institutioner og lærer
			$scope.institutionArray = []
			$scope.laererArray = []
			bookings.forEach(function(booking) {
				if (booking.Klasse) {
					booking.Klasse.forEach(function(klasse) {
						if (!~$scope.institutionArray.indexOf(klasse.institutionsnavn)) $scope.institutionArray.push(klasse.institutionsnavn)
						if (!~$scope.laererArray.indexOf(klasse.laererNavn)) $scope.laererArray.push(klasse.laererNavn)
					})
				}
			})
		})

		Resultat.query().$promise.then(function(resultater) {
			var bookings = Db.bookings()

			function getItems(resultat_id) {
				return Resultat_item.query({ where: { resultat_id: resultat_id }}).$promise.then(function(items) {
					return items
				})
			}
			
			function getBooking(booking_id) {
				if (booking_id == null) return null 
				for (var i=0, l=bookings.length; i<l; i++) {
					if (bookings[i].booking_id == booking_id) return bookings[i]
				}
				console.log('severe error', booking_id)
			}

			$scope.resultater = resultater.map(function(resultat) {
				Resultat_item.query({ where: { resultat_id: resultat.resultat_id }}).$promise.then(function(items) {
					resultat.Resultat_items = items
				})
				Proeve.get( { id: resultat.proeve_id }).$promise.then(function(items) {
					resultat.Proeve = items
				})
				resultat.Booking = getBooking(resultat.booking_id)
				/*
				Booking.get( { id: resultat.booking_id }).$promise.then(function(items) {
					resultat.Booking = items
				})
				*/
				
				return resultat
			})

		})

		Db.reloadResultat_items().then(function(resultat_items) {	
			$scope.resultat_items = resultat_items
		})

		Db.reloadTaxons().then(function(taxons) {	
			$scope.taxons = taxons
			$scope.taxonTags = taxons.map(function(taxon) {
				return { text: taxon.taxon_navn_dk }
			})
			$scope.taxonDkArray = taxons.map(function(taxon) {
				return taxon.taxon_navn_dk
			})
			//console.log('TTTT', $scope.taxonDkArray)
		})

		$scope.arter = []

		$scope.soeg = {
		}

		$scope.soegHasParams = function() {
			for (var key in $scope.soeg) {
				if ($scope.soeg[key] && $scope.soeg[key].toString() != '') return true
			}
			return false
			//return Object.keys().length > 0
		}

		$scope.$watch('soeg', function(newVal, oldVal){
			if (newVal == oldVal) return
			if ($scope.soegHasParams()) {
				$scope.performSearch()
			}
		}, true);

		$scope.searchOptions = DTOptionsBuilder.newOptions()
			.withOption('destroy', true)
			.withDOM('t')
      .withDisplayLength(-1)
			.withOption('scrollY', '250px')
			.withOption('scrollCollpase', false)
			.withLanguage(Utils.dataTables_daDk);

		$scope.searchColumns = [
      DTColumnBuilder.newColumn(0).withTitle('Lokalitet'),
      DTColumnBuilder.newColumn(1).withOption('type', 'dna').withTitle('Analysedato'),
      DTColumnBuilder.newColumn(2).withTitle('Art'),
		]

		//----------------------------------------
		$scope.performSearch = function() {
			$scope.searchResults = [
				{ lokalitet: 'test', analyseDato: 'qwerty' }
			]

			var soeg = $scope.soeg,
					sagsNo = soeg.sagsNo,
					institutionsNavn = soeg.institutionsNavn,
					laererNavn = soeg.laererNavn,
					proeveId = soeg.proeveId,
					indsamlerNavn = soeg.indsamlerNavn,
					analyseDato = Date.parse(soeg.analyseDato),
					analyseDatoFra = analyseDato>0 ? analyseDato - (86400000/2) : 0,
					analyseDatoTil = analyseDato>0 ? analyseDato + (86400000/2) : 9999999999999999999

			console.log(analyseDatoFra, analyseDatoTil)

			var filter = angular.copy($scope.resultater)

			//analysedato
			if (analyseDato) filter = filter.filter(function(resultat) {
				var resAnalyseDato = Date.parse(resultat.datoForAnalyse)
				if (analyseDatoFra <= resAnalyseDato && analyseDatoTil >= resAnalyseDato) {
					return resultat
				}
			})
			//sagsNo
			console.log('sagsNo', sagsNo)
			if (sagsNo) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.sagsNo == sagsNo) {
					return resultat
				}
			})
			//institutionsnavn
			if (institutionsNavn) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.Klasse) {
					for (var i=0;i<resultat.Booking.Klasse.length; i++) {
						console.log(institutionsNavn, resultat.Booking.Klasse[i].institutionsnavn)
						if (institutionsNavn == resultat.Booking.Klasse[i].institutionsnavn) return resultat
					}
				}
			})
			//laererNavn
			if (laererNavn) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.Klasse) {
					for (var i=0;i<resultat.Booking.Klasse.length; i++) {
						console.log(laererNavn, resultat.Booking.Klasse[i].laererNavn)
						if (laererNavn == resultat.Booking.Klasse[i].laererNavn) return resultat
					}
				}
			})

			//.................

			//proeveId
			if (proeveId) filter = filter.filter(function(resultat) {
				console.log(proeveId, resultat.Proeve.proeve_nr)
				if (resultat.Proeve && resultat.Proeve.proeve_nr) {
					if (resultat.Proeve.proeve_nr == proeveId) return resultat
				}
			})
			//indsamlerNavn
			if (indsamlerNavn) filter = filter.filter(function(resultat) {
				if (resultat.Proeve && resultat.Proeve.indsamlerNavn) {
					if (resultat.Proeve.indsamlerNavn == indsamlerNavn) return resultat
				}
			})


			/*
			filter = filter.filter(function(resultat) {
				var resAnalyseDato = Date.parse(resultat.datoForAnalyse)
				if (analyseDatoFra <= resAnalyseDato && analyseDatoTil >= resAnalyseDato) {
					return resultat
				}
			})
			*/

			//create dataset
			var dataset = [], 
					taxon = null;

			filter.forEach(function(resultat) {
				resultat.Resultat_items.forEach(function(item) {
					taxon = $scope.getTaxon(item.taxon_id)
					dataset.push({
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_navn: taxon.taxon_navn,
						lokalitet: resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.presentationString : '',
						lat: resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.latitude : null,
						lng: resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.longitude : null,
						analyseDato: Utils.fixDate(resultat.datoForAnalyse)
					})
				})
			})
			console.log(dataset)
			$scope.searchResults = dataset
			//
		}

		$scope.resetForm = function() {
			$scope.soeg = {}
		}

		var proeveMap

		var redIcon = L.icon({
			iconUrl: 'assets/images/Circle_Red.png',
			iconAnchor: [6,6], 
			popupAnchor: [9,0] 
		})

			
		var greenIcon = L.icon({
			iconUrl: 'assets/images/Circle_Green.png',
			iconAnchor: [0,0], 
			popupAnchor: [9,0] 
		})

		var grayIcon = L.icon({
			iconUrl: 'assets/images/Circle_Grey.png',
			iconAnchor: [0,0], 
			popupAnchor: [9,0] 
		})

		$scope.getTaxon = function(taxon_id) {
			for (var i=0; i<$scope.taxons.length; i++) {
				if ($scope.taxons[i].taxon_id == taxon_id) {
					return $scope.taxons[i]
				}
			}
		}

		$scope.getBookingKlasse = function(booking_id) {
			//console.log('getBooking', booking_id)
			if (!$scope.bookings || booking_id == undefined) return 
			for (var i=0; i<$scope.bookings.length; i++) {
				if ($scope.bookings[i].booking_id == booking_id) {
					//console.log($scope.bookings[i])
					return $scope.bookings[i].Klasse
				}
			}
		}

		$timeout(function() {
			proeveMap = L.map('proeve-map').setView([55.685255690177826, 12.572981195446564], 7);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(proeveMap)
		})

		/*
		$scope.loadData = function() {
			Proeve.query().$promise.then(function(proever) {
				proever.forEach(function(proeve) {
					if (proeve.Resultat && proeve.Resultat.length>0
							&& proeve.Lokalitet
							&& proeve.Lokalitet.latitude != ''
							&& proeve.Lokalitet.longitude != '') {
						
						var bookingKlasse = $scope.getBookingKlasse(proeve.Resultat[0].booking_id)
						var klasser = ''
						var laerer = []
						if (proeve.Resultat[0].booking_id) bookingKlasse.forEach(function(klasse) {
							laerer.push(klasse.laererNavn)
							if (klasser != '') klasser+='<br>'
							klasser += klasse.institutionsnavn +', '+klasse.laererNavn + '&nbsp;&nbsp;&nbsp;'
						})

						var popup = ''
						popup += '<h3>'+proeve.Lokalitet.presentationString+'</h3>'
	
						popup += '<table class="visualisering-popup">'
						popup += '<tr><td>PrøveID</td><td>'+ proeve.proeve_nr +'</td></tr>'
						popup += '<tr><td>Geolok.</td><td>'+ proeve.Lokalitet.latitude + ',' + proeve.Lokalitet.longitude +'</td></tr>'
	
						if (proeve.Indsamler && !~laerer.indexOf(proeve.Indsamler)) {
							popup += '<tr><td>Indsamler</td><td>'+ proeve.Indsamler +'</td></tr>'
						}

						if (klasser != '') popup += '<tr><td>Institution</td><td>'+ klasser +'</td></tr>'
						popup += '<tr><td>Indsamlingsdato</td><td>'+ Utils.fixDate(proeve.indsamlingsdato) +'</td></tr>'
						popup += '<tr><td>Analysedato</td><td>'+ Utils.fixDate(proeve.Resultat[0].datoForAnalyse) +'</td></tr>'
						popup += '</table>'
						popup += '<br>'
						popup += '<table>'
						//
						Resultat_item.query({ where: { resultat_id: proeve.Resultat[0].resultat_id }}).$promise.then(function(resultat_items) {	
							var processedTaxons = [], found = [], notFound = [];
							resultat_items.forEach(function(item) {
								if (item.eDNA && item.database_result) {
									if (found.indexOf(item.taxon_id) == -1) {
										found.push(item.taxon_id)
										var taxon  = $scope.getTaxon(item.taxon_id)
										popup += '<tr><td><i class="fa fa-check green">&nbsp;</td><td>'+taxon.taxon_navn_dk+' <em style="color:gray;">'+taxon.taxon_navn+'</em></td></tr>'
									}
								}
							})	

							popup += '</table>'
							popup += '<br>'

							var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)],
								{ icon: redIcon }
							).addTo(proeveMap)
						   .bindPopup(popup)

						})
					} else if (proeve.Lokalitet	&& parseFloat(proeve.Lokalitet.latitude)>0 && parseFloat(proeve.Lokalitet.longitude)>0) {

						var popup = ''
						popup += '<h3>'+proeve.Lokalitet.presentationString+'</h3>'

						popup += '<table class="visualisering-popup">'
						popup += '<tr><td>PrøveID</td><td>'+ proeve.proeve_nr +'</td></tr>'
						popup += '<tr><td>Geolok.</td><td>'+ proeve.Lokalitet.latitude+',' + proeve.Lokalitet.longitude +'</td></tr>'
						popup += '<tr><td>Indsamler</td><td>'+ proeve.Indsamler +'</td></tr>'
						popup += '<tr><td>Indsamlingsdato</td><td>'+ Utils.fixDate(proeve.indsamlingsdato) +'</td></tr>'
						popup += '</table>'
						popup += '<br>'
	
						var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)]
								//{ icon: grayIcon }
							).addTo(proeveMap)
						   .bindPopup(popup)
					}					
				})
			})
		}
		*/

		//tab navigation
		$scope.tabs = {
			activeTab: 0
		}

		$timeout(function() {
			$('a[data-toggle="tab"]').on('click', function (e) {	
				//console.log(L)
				//L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container);
				//L.invalidateSize()
				//console.dir(e)
				proeveMap.invalidateSize()
			})
		})

		//taxon art DK
		$scope.arter = []
			
		$scope.filterTaxons = function(query) {
			console.log(query)
		}

		/*
		$timeout(function() {
			//sagsnr
			$scope.sagsNoArray = Db.bookings().map(function(booking) {
				return booking.sagsNo
			})

			//institutioner og lærer
			$scope.institutionArray = []
			$scope.laererArray = []
			Db.bookings().forEach(function(booking) {
				if (booking.Klasse) {
					booking.Klasse.forEach(function(klasse) {
						if (!~$scope.institutionArray.indexOf(klasse.institutionsnavn)) $scope.institutionArray.push(klasse.institutionsnavn)
						if (!~$scope.laererArray.indexOf(klasse.laererNavn)) $scope.laererArray.push(klasse.laererNavn)
					})
				}
			})
		})
		*/

		$('#artDk').tagsinput({
		  typeahead: {
		    source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
		  }
		})



}]);

