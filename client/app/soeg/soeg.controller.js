'use strict';

angular.module('dnalivApp')
  .controller('SoegCtrl', ['ItemsService', '$scope', '$http', '$timeout', '$modal', 'User', 'Utils', 'Alert', 'Proeve', 'Booking', 'TicketService', 
			'Resultat', 'Resultat_item', 'System_user', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'Db', 'leafletData',

	 function (ItemsService, $scope, $http, $timeout, $modal, User, Utils, Alert, Proeve, Booking, TicketService,
			Resultat, Resultat_item, System_user, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, Db, leafletData) {

		Db.init();

		angular.extend($scope, {
			events: {
				map: {
					enable: ['zoomstart', 'drag', 'click', 'dblclick', 'mouseover'],
					logic: 'emit'
				}
			},
			center: {
				lat: 56.126627523318206,
				lng: 11.457741782069204,
				zoom: 7
			},
			markers: [],
			layers: {
        baselayers: {
					googleTerrain: {
				    name: 'Google Terrain',
				    layerType: 'TERRAIN',
				    type: 'google',
						layerOptions: {
							mapOptions: {
								styles: DefaultGoogleStyles
						  }
						}
				  },
				  googleHybrid: {
				    name: 'Google Hybrid',
				    layerType: 'HYBRID',
				    type: 'google',
						layerOptions: {
							mapOptions: {
								styles: DefaultGoogleStyles
						  }
						}
				  },
					luftfoto: {
						name: "Orto forår",
						type: 'wms',
						visible: true,
						url: "http://kortforsyningen.kms.dk/topo_skaermkort",
						layerOptions: {
							layers: "orto_foraar",
							servicename: "orto_foraar",
							version: "1.1.1",
							request: "GetMap",
							format: "image/jpeg",
							service: "WMS",
							styles: "default",
							exceptions: "application/vnd.ogc.se_inimage",
							jpegquality: "80",
							attribution: "Indeholder data fra GeoDatastyrelsen, WMS-tjeneste",
							ticket: TicketService.get()
						}
					}
				},
				overlays: {
					resultater: {
          	name: 'Søgeresultater',
						type: 'markercluster',
						layerOptions: {
							maxClusterRadius: function(zoom) { 
				        return (zoom > 10) ? 10 : 0.1; // radius in pixels
							}
						},
						visible: true
					}
				}
			}
		})

		//global map variable
		$timeout(function() {
			leafletData.getMap().then(function (map) {
				$scope.map = map
			})
		})

		//prøveData lookups
		Db.reloadProever().then(function(proever) {	
			var proeveIdArray = [], 
					proeveIdHash = {},
					indsamlerArray = [],
					indsamlerKommune = [],
					indsamlerInstitutionArray = [];

			for (var i=0, l=proever.length; i<l; i++) {
				if (!~proeveIdArray.indexOf(proever[i].proeve_nr)) proeveIdArray.push(proever[i].proeve_nr)
				proeveIdHash[ proever[i].proeve_id ] = proever[i].proeve_nr

				Utils.arrayInsert(indsamlerArray, proever[i].indsamlerNavn)
				Utils.arrayInsert(indsamlerInstitutionArray, proever[i].indsamlerInstitution)

				if (i==(l-1)) {
					$scope.indsamlerArray = indsamlerArray.sort()
					$scope.indsamlerInstitutionArray = indsamlerInstitutionArray.sort()
					$scope.proeveIdArray = proeveIdArray.sort()
					$scope.proeveIdHash = proeveIdHash	
				}
			}
		})

		//analalyseData lookups
		Db.reloadBookings().then(function(bookings) {	
			$scope.sagsNoArray = bookings.map(function(booking) {
				return booking.sagsNo
			})

			//institutioner og lærer
			var institutionArray = [];
			var laererArray = [];
			var	kommuneArray = [];
			var	regionArray = [];
			var	booking;

			for (var i=0, l=bookings.length; i<l; i++) {
				booking = bookings[i]
				if (booking.Klasse) {
					booking.Klasse.forEach(function(klasse) {
						Utils.arrayInsert(institutionArray, klasse.institutionsnavn)
						Utils.arrayInsert(laererArray, klasse.laererNavn)
						Utils.arrayInsert(kommuneArray, klasse.kommune)
						Utils.arrayInsert(regionArray, klasse.region)
					})
				}
				if (i==(l-1)) {
					$scope.institutionArray = institutionArray.sort()
					$scope.laererArray = laererArray.sort()
					$scope.kommuneArray = kommuneArray.sort()
					$scope.regionArray = regionArray.sort()
				}
			}
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
		})

		$scope.arter = []
		$scope.soeg = {
		}

		$scope.soegHasParams = function() {
			for (var key in $scope.soeg) {
				if ($scope.soeg[key] && $scope.soeg[key].toString() != '') return true
			}
			return false
		}

		$scope.$watchGroup(['soeg.sagsNo', 'soeg.institutionsNavn', 'soeg.laererNavn', 
												'soeg.proeveId', 'soeg.indsamlerNavn', 'soeg.indsamlerInstitution', 
												'soeg.analyseDato', 'soeg.taxon_id', 
												'soeg.indsamlingsDatoFra', 'soeg.indsamlingsDatoTil'], function(newVal, oldVal){
			if (newVal == oldVal) return
			if ($scope.soegHasParams()) {
				$scope.performSearch()
			}
		}, true);

		$scope.$watchGroup(['soeg.kommune', 'soeg.region'], function(newVal, oldVal){
			$scope.soeg.jsonIsReady = null;
			if (newVal == oldVal) return;
			if ($scope.soegHasParams()) {
				var watch = $scope.$watch('soeg.jsonIsReady', function(newVal, oldVal) {
					if (newVal) {
						watch(); //clear $watch
						$scope.performSearch();
					}
				})
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
      DTColumnBuilder.newColumn(0).withTitle('PrøveID'),
      DTColumnBuilder.newColumn(1).withTitle('Lokalitet'),
      DTColumnBuilder.newColumn(2).withOption('type', 'dna').withTitle('Analysedato'),
      DTColumnBuilder.newColumn(3).withTitle('Art')
		]

		/** 
			filter results by user input
		*/
		$scope.performSearch = function() {
			$scope.searchResults = [
				{ lokalitet: 'Ukendt', analyseDato: 'Ukendt' }
			]

			var soeg = $scope.soeg,
					sagsNo = soeg.sagsNo,
					institutionsNavn = soeg.institutionsNavn,
					laererNavn = soeg.laererNavn,
					proeveId = soeg.proeveId,
					indsamlerNavn = soeg.indsamlerNavn,
					indsamlerInstitution = soeg.indsamlerInstitution,
					kommune = soeg.kommune,
					region = soeg.region,
					taxon_id = soeg.taxon_id, 
					analyseDato = Date.parse(soeg.analyseDato),
					analyseDatoFra = analyseDato>0 ? analyseDato - (86400000/2) : 0,
					analyseDatoTil = analyseDato>0 ? analyseDato + (86400000/2) : 9999999999999999999,
					indsamlingsDatoFra = soeg.indsamlingsDatoFra ? Date.parse(soeg.indsamlingsDatoFra) : null,
					indsamlingsDatoTil = soeg.indsamlingsDatoTil ? Date.parse(soeg.indsamlingsDatoTil) : null;

			var filter = angular.copy($scope.resultater)

			//analysedato
			if (analyseDato) filter = filter.filter(function(resultat) {
				var resAnalyseDato = Date.parse(resultat.datoForAnalyse)
				if (analyseDatoFra <= resAnalyseDato && analyseDatoTil >= resAnalyseDato) {
					return resultat
				}
			});

			//indsamlingsdatoFra
			if (indsamlingsDatoFra) filter = filter.filter(function(resultat) {
				var resIndsamlingsDato = Date.parse(resultat.Proeve.indsamlingsDato)
				if (indsamlingsDatoFra <= resIndsamlingsDato) {
					return resultat
				}
			});

			//indsamlingsdatoTil
			if (indsamlingsDatoTil) filter = filter.filter(function(resultat) {
				var resIndsamlingsDato = resultat.Proeve ? Date.parse(resultat.Proeve.indsamlingsDato) : 0;
				if (indsamlingsDatoTil >= resIndsamlingsDato) {
					return resultat
				}
			});

			//sagsNo
			if (sagsNo) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.sagsNo === sagsNo) {
					return resultat
				}
			});

			//institutionsnavn
			if (institutionsNavn) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.Klasse) {
					for (var i=0;i<resultat.Booking.Klasse.length; i++) {
						if (institutionsNavn == resultat.Booking.Klasse[i].institutionsnavn) return resultat
					}
				}
			});

			//laererNavn
			if (laererNavn) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.Klasse) {
					for (var i=0;i<resultat.Booking.Klasse.length; i++) {
						if (laererNavn == resultat.Booking.Klasse[i].laererNavn) return resultat
					}
				}
			});

			//kommune
			if (kommune) filter = filter.filter(function(resultat) {
				if (resultat.Proeve && resultat.Proeve.Lokalitet) {
					return $scope.pointInGeoJSON(resultat.Proeve.Lokalitet.latitude, resultat.Proeve.Lokalitet.longitude)
				}
			});

			//region
			if (region) filter = filter.filter(function(resultat) {
				if (resultat.Booking && resultat.Booking.Klasse) {
					for (var i=0;i<resultat.Booking.Klasse.length; i++) {
						if (region == resultat.Booking.Klasse[i].region) return resultat
					}
				}
			});

			//taxon
			if (taxon_id) filter = filter.filter(function(resultat) {
				if (resultat.Resultat_items && resultat.Resultat_items.length) {
					for (var i=0;i<resultat.Resultat_items.length; i++) {
						if (taxon_id == resultat.Resultat_items[i].taxon_id) return resultat
					}
				}
			});

			//.................

			//proeveId
			if (proeveId) filter = filter.filter(function(resultat) {
				if (resultat.Proeve && resultat.Proeve.proeve_nr) {
					if (resultat.Proeve.proeve_nr == proeveId) return resultat
				}
			});

			//indsamlerNavn
			if (indsamlerNavn) filter = filter.filter(function(resultat) {
				if (resultat.Proeve && resultat.Proeve.indsamlerNavn == indsamlerNavn) {
					return resultat
				}
			});

			//indsamlerInstitution
			if (indsamlerInstitution) filter = filter.filter(function(resultat) {
				if (resultat.Proeve && resultat.Proeve.indsamlerInstitution) {
					if (resultat.Proeve.indsamlerInstitution == indsamlerInstitution) return resultat
				}
			});

			//create dataset
			var dataset = [];
			var exportDataset = [];
			var taxon = null;

			$scope.markers = [];

			filter.forEach(function(resultat) {
				dataset.push({
					proeve_nr: resultat.Proeve ? resultat.Proeve.proeve_nr : '',
					lokalitet: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.presentationString : '',
					lat: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.latitude : null,
					lng: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.longitude : null,
					analyseDato: Utils.fixDate(resultat.datoForAnalyse)
				})

				var taxonMap = [];
				if (resultat.Resultat_items) resultat.Resultat_items.forEach(function(item) {

					taxon = $scope.getTaxon(item.taxon_id)
					if (!taxonMap[item.taxon_id]) {
						taxonMap[item.taxon_id] = { 
							found: false, 
							paalidelig: false, 
							taxon_dk: taxon.taxon_navn_dk,
							taxon: taxon.taxon_navn,
							taxon_prioritet: taxon.taxon_prioritet,
							//
							eDNA: item.eDNA,
							positiv: item.positiv,
							negativ: item.negativ,
							Ct_vaerdi: item.Ct_vaerdi
						}
					}

					//any paalidelig and eDNA overrules all other items
					if (item.eDNA == true && item.database_result) {
						taxonMap[item.taxon_id].found = true
						taxonMap[item.taxon_id].paalidelig = true
					} 
					if (item.eDNA == false && item.database_result) {
						taxonMap[item.taxon_id].paalidelig = true
					} 
				})

				//sort by taxon_prioritet
				taxonMap.sort(function(a, b) {
					if (!a.paalidelig) return 100
			    return parseFloat(a.taxon_prioritet) - parseFloat(b.taxon_prioritet)
				})

				//construct basic exportItem to use for exportDataset
				var proeve_id = resultat.Proeve ? resultat.Proeve.proeve_id : null;
						
				var institutioner = resultat.Booking && resultat.Booking.Klasse 
					? resultat.Booking.Klasse.map(function(klasse) {
							return klasse.institutionsnavn
						}).join(', ')
					: '(ikke sat) '
	
				var exportItemBase = {
					proeve_id: proeve_id,
					ProeveId: $scope.proeveIdHash[proeve_id] ? $scope.proeveIdHash[proeve_id] : '(PrøveID ikke sat)',
					lokalitet: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.presentationString : '',
					dataset: resultat.Proeve ? resultat.Proeve.dataset : '',
					lat: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.latitude : null,
					lng: resultat.Proeve && resultat.Proeve.Lokalitet ? resultat.Proeve.Lokalitet.longitude : null,
					analyseDato: Utils.fixDate(resultat.datoForAnalyse),
					indsamlingsDato: resultat.Proeve && resultat.Proeve.indsamlingsDato ? Utils.fixDate(resultat.Proeve.indsamlingsDato) : '(ikke sat)',
					indsamlerNavn: resultat.Proeve && resultat.Proeve.indsamlerNavn ? resultat.Proeve.indsamlerNavn : '(ikke sat)',
					indsamlerInst: resultat.Proeve && resultat.Proeve.indsamlerInstitution ? ', '+resultat.Proeve.indsamlerInstitution : '',
					institutioner: institutioner
				}

				var message = '';
				message += '<b>' + exportItemBase.ProeveId + '</b><br>';
				message += '<b>'+ exportItemBase.lokalitet + '</b><br>';
				message += 'Indsamlingdato : <b>'+ exportItemBase.indsamlingsDato + ', ' + exportItemBase.indsamlerNavn + exportItemBase.indsamlerInst + ' </b><br>';
				message += 'Analysedato : <b>'+ exportItemBase.analyseDato + ', ' + institutioner + '</b><br>';

				taxonMap.forEach(function(item) {
					var exportItem = angular.copy(exportItemBase);
		
					exportItem.positivFound = item.found;
					exportItem.paalidelig = item.paalidelig;
					exportItem.eDNA = item.eDNA;
					exportItem.negativ = item.negativ;
					exportItem.positiv = item.positiv;
					exportItem.Ct_vaerdi = item.Ct_vaerdi;
					exportItem.analyseDato = Utils.fixDate(resultat.datoForAnalyse);
					exportItem.taxon = item.taxon;
					exportItem.taxon_dk = item.taxon_dk;
					
					if (item.found && item.paalidelig) {
						message += '<i class="fa fa-check green"></i>&nbsp;' 
					} else if (!item.found && item.paalidelig) {
						message += '<i class="fa fa-remove red"></i>&nbsp;'
					} else {
						message += '<i class="fa fa-question"></i>&nbsp;' 
					}

					message += item.taxon_dk
					message += '<br>'

					exportDataset.push(exportItem)
				})
	
				if (exportItemBase.lat && exportItemBase.lng) $scope.markers.push({
					lat: parseFloat(resultat.Proeve.Lokalitet.latitude),
					lng: parseFloat(resultat.Proeve.Lokalitet.longitude),
					layer: 'resultater',
					icon: greenIcon,
					message: message
				})

			})

			$scope.searchResults = dataset
			$scope.exportDataset = exportDataset
			//
		}

		$scope.resetForm = function() {
			$scope.soeg = {};
			//reset map
			angular.extend($scope, {
				geojson: {},
				center: {
					lat: 56.126627523318206,
					lng: 11.457741782069204,
					zoom: 7
				},
				markers: []
			})
			//reset search results
			$scope.searchResults = [];
			$scope.exportDataset = [];
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
			if (!$scope.bookings || booking_id == undefined) return 
			for (var i=0; i<$scope.bookings.length; i++) {
				if ($scope.bookings[i].booking_id == booking_id) {
					return $scope.bookings[i].Klasse
				}
			}
		}


		//taxon art DK
		$scope.arter = [];
			
		/**
			geoJSON
		*/
		$scope.centerJSON = function() {
			var latlngs = [];
			for (var i in $scope.geojson.data.features[0].geometry.coordinates) {
				var coord = $scope.geojson.data.features[0].geometry.coordinates[i];
				for (var j in coord) {
					latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
				}
			}
			$scope.map.fitBounds(latlngs);
		}

		$scope.pointInGeoJSON = function(lat, lng) {
			var latlngs = [];
			for (var i in $scope.geojson.data.features[0].geometry.coordinates) {
				var coord = $scope.geojson.data.features[0].geometry.coordinates[i];
				for (var j in coord) {
					latlngs.push(L.GeoJSON.coordsToLatLng(coord[j]));
				}
			}

			var x = lat, y = lng;

		  var inside = false;
    	for (var i = 0, j = latlngs.length - 1; i < latlngs.length; j = i++) {
        var xi = latlngs[i].lat, yi = latlngs[i].lng;
        var xj = latlngs[j].lat, yj = latlngs[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    	}

    	return inside;

		}

		$scope.loadKommune = function(kommune) {
			$scope.soeg.region = ''; //reset region

			if (kommune == 'Høje-Taastrup') kommune = 'Høje Taastrup';
			if (kommune == 'Birkerød') kommune = 'Rudersdal';

			var url = 'http://services.kortforsyningen.dk/?servicename=RestGeokeys_v2&method=kommune&komnavn='+kommune+'&geometry=true&outgeoref=EPSG:4326&ticket='+TicketService.get()
			$http.get(url).success(function(data, status) {
				angular.extend($scope, {
					geojson: {
						data: data,
						style: {
							fillColor: '#ff0000',
							color: '#ffff00',
							weight: 3,
							fillRule: 'nonzero'
						}
					}
        })
				$timeout(function() {
					$scope.centerJSON()
					$scope.soeg.jsonIsReady = true
				}, 1000)
			})
		}

		var regionsKoder = {
			'Nordjylland' : 1081,
			'Midtjylland' : 1082,
			'Syddanmark'  : 1083,
			'Hovedstaden' : 1084,
			'Sjælland'    : 1085
		}

		$scope.loadRegion = function(region) {
			$scope.soeg.kommune = ''; //reset kommune
			var regKode = regionsKoder[region] ? regionsKoder[region] : false
			var url = 'http://services.kortforsyningen.dk/?servicename=RestGeokeys_v2&method=kommune&regkode='+regKode+'&geometry=true&outgeoref=EPSG:4326&ticket='+TicketService.get()
			$http.get(url).success(function(data, status) {
				angular.extend($scope, {
					geojson: {
						data: data,
						style: {
							fillColor: '#ff0000',
							color: '#ffff00',
							weight: 3,
							fillRule: 'nonzero'
						}
					}
        })
				$timeout(function() {
					$scope.centerJSON()
					$scope.soeg.jsonIsReady = true
				}, 1000)
			})
		}

		$scope.getKommunePolygon = function(kommune) {
			$scope.loadKommune(kommune)
		}

		/*
			CSV
		*/
		$scope.downloadGBIF = function() {
			var csv = [['occurrenceID', 
									'materialSampleID',
									'datasetName',
									'countryCode', 
									'locality',
									'decimalLatitude', 
									'decimalLongitude',
									'scientificName',
									'vernacularName',
									'occurrenceStatus',
									'eventDate',
									'dateIdentified',
									'Ct'
			]];

			for (var i=0, l=$scope.exportDataset.length; i<l; i++) {
				var item = $scope.exportDataset[i];

				//get rid of null values
				for (var prop in item) {
					if (item[prop] == null) item[prop] = '';
				}

				csv.push([
					(i+1).toString().quote(),
					item.ProeveId.quote(),
					item.dataset.quote(),
					'DK'.quote(),
					item.lokalitet.quote(),
					item.lat.toString().quote(),
					item.lng.toString().quote(),
					item.taxon.quote(),
					item.taxon_dk.quote(),
					item.positivFound ? 'present'.quote() : 'absent'.quote(),
					item.indsamlingsDato.quote(),
					item.analyseDato.quote(),
					item.Ct_vaerdi
				])
			}
					
			var csvRows = [];
			for(var i=0, l=csv.length; i<l; ++i){
		    csvRows.push(csv[i].join(';'));
			}
			var csvString = csvRows.join("\n");
			
			var a = document.createElement('a');
			a.href = 'data:attachment/csv,' +  encodeURIComponent(csvString);
			a.target = '_blank';
			a.download = 'dnaogliv_soegning_' + Utils.fixDate(new Date()) +'.csv';

			document.body.appendChild(a);
			a.click();
		}

}]);

