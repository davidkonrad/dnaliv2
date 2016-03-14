'use strict';

angular.module('dnalivApp')
  .controller('BookingCtrl', ['$scope', '$http', '$timeout', 'Auth', 'Booking', 'Klasse', 'Klassetrin', 'Fag', 'Taxon', 'Booking_taxon', 
	function ($scope, $http, $timeout, Auth, Booking, Klasse, Klassetrin, Fag, Taxon, Booking_taxon) { 

		var getObj = function($resource, prefix) {
			var exclude = ['$promise','$resolved','toJSON','$get','$save','$query','$remove','$delete','$update'],
					prop, p = {};
			for (prop in $resource) {
				if (prefix) {
					if (~prop.indexOf(prefix)) p[prop] = $resource[prop]
				} else {
					if (!~exclude.indexOf(prop)) p[prop] = $resource[prop]
				}
			}
			return p;
		}

		$scope.booking = {};
		$scope.bookings = [];
		$scope.projectLoaded = function() {
			return !angular.isDefined($scope.booking.booking_kode)
    }
		$scope.klasser = [{ institution: '... ' }	];

		Booking.query().$promise.then(function(bookings) {	
			$scope.bookings = bookings.map(function(booking) {
				return booking
			})
			$('.booking-typeahead').typeahead({
				showHintOnFocus: true,
				source: $scope.bookings,
				displayText: function(item) {
					return item.sagsNo
				},
				afterSelect: function(item) {
					$scope.loadBooking(item.booking_id)
				}
			})
		})

	/**
	 * Create a new booking and load it
	 */
		$scope.createBooking = function() {
			var kode = prompt('SagsNo: ', '');
			if (kode != '') Booking.save({ booking_id: '' }, { booking_kode: kode }).$promise.then(function(booking) {	
				$scope.loadBooking(booking.booking_id)
			})
		}

	/**
	 * Load a booking
	 * @param {int} booking_id - unique booking_id of the booking
	 */
		$scope.loadBooking = function(booking_id) {
			Booking.get({ id: booking_id }).$promise.then(function(booking) {	
				$scope.booking = getObj(booking)
				$scope.loadBookingTaxons();
				$scope.loadKlasser(booking.booking_id)
				document.querySelector('.booking-typeahead').value = booking.sagsNo
			})
		}

	/**
	 * Save current booking
	 */
		$scope.saveBooking = function() {
			Booking.update({ booking_id: $scope.booking.booking_id }, $scope.booking)
		}

	/**
	 * Reload and filter the klasser array
	 * @param {int} booking_id - unique booking_id of the booking
	 */
		$scope.loadKlasser = function(booking_id) {
			Klasse.query({ booking_id: booking_id }).$promise.then(function(klasser) {	
				$scope.klasser = klasser.filter(function(klasse) {
					if (klasse.booking_id == booking_id) {
						klasse.edited = false
						return klasse
					}
				})
				console.log('loadklasser', $scope.klasser)
			})
		}

	/**
	 * Returns a pure klasse literal
	 * @param {int} klasse_id - unique klasse_id of the klasse
	 */
		$scope.getKlasseObj = function(klasse_id) {
			return $scope.klasser.filter(function(klasse) {
				if (klasse.klasse_id == klasse_id) return klasse
			})[0]
		}

	/**
	 * Save changes to a klasse
	 * @param {int} klasse_id - unique klasse_id of the klasse
	 */
		$scope.saveKlasse = function(klasse_id) {
			var klasse = $scope.getKlasseObj(klasse_id)
			console.log(klasse);
			Klasse.update({ klasse_id: klasse.klasse_id }, klasse)
		}

	/**
	 * Check if content of a klasse is changed
	 * @param {int} klasse_id - unique klasse_id of the klasse
	 */
		$scope.klasseIsEdited = function(klasse_id) {
			var panel = document.querySelector('[data-klasse-id="'+klasse_id+'"]');
			if (panel) {
				var i=0, inputs = panel.querySelectorAll('input');
				for (i; i<inputs.length; i++) {
					if (angular.element(inputs[i]).hasClass('ng-dirty')) return true
				}
			}
		}
			
	/**
	 * Attach a new klasse to the current booking
	 */
		$scope.createKlasse = function() {
			Klasse.save({ klasse_id: '' }, { booking_id: $scope.booking.booking_id }).$promise.then(function(klasse) {
				$scope.loadKlasser($scope.booking.booking_id)
			})
		}

		Klassetrin.query().$promise.then(function(klassetrin) {	
			$scope.klassetrin = [];
			klassetrin.forEach(function(klassetrin) {
				$scope.klassetrin.push(klassetrin);
			})
		})

		Fag.query().$promise.then(function(fag) {	
			$scope.fag = [];
			fag.forEach(function(fag) {
				$scope.fag.push(fag);
			})
		})

		$scope.loadBookingTaxons = function() {
			Booking_taxon.query({ booking_id: $scope.booking_booking_id }).$promise.then(function(booking_taxons) {	
				$scope.bookingTaxons = [];
				booking_taxons.forEach(function(item) {
					if (item.booking_id == $scope.booking.booking_id) $scope.bookingTaxons.push(item);
				})
				$scope.loadTaxons();
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
				console.log($scope.taxons);
			})
		}
	
		$scope.bookingTaxonToggle = function(art) {
			console.log(art);
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

	/*
	 * lokalitet map
   */

/*
map.on('baselayerchange', function (e) {
    if (e.name === 'Skærmkort') {
        matrikelkort.setParams({
            styles: 'sorte_centroider,sorte_skel,default'
        });
    } else if (e.name === 'Flyfoto') {
        matrikelkort.setParams({
            styles: 'gule_centroider,gule_skel,Gul_OptagetVej,default'
        });
    }
});

map.setView(L.latLng(55.9, 11.8), 1);
*/
		var pass = 	'login=davidkonrad&password=nhmdzm&';
		$scope.map = false;
		$scope.initializeMap = function() {
			if ($scope.map && $scope.map._leaflet_id) { 
				$scope.map.invalidateSize();
				return
			}
			
			$scope.map = L.map('map');

/*

$scope.map.on('baselayerchange', function (e) {
    if (e.name === 'Skærmkort') {
        matrikelkort.setParams({
            styles: 'sorte_centroider,sorte_skel,default'
        });
    } else if (e.name === 'Flyfoto') {
        matrikelkort.setParams({
            styles: 'gule_centroider,gule_skel,Gul_OptagetVej,default'
        });
    }
});
*/

		var ortofoto = new L.tileLayer('http://{s}.services.kortforsyningen.dk/orto_foraar?'+pass+'request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
			attribution: 'Geodatastyrelsen',
	    continuousWorld: true,
  	  maxZoom: 14,
  	  zoom: function () {
        var zoom = $scope.map.getZoom();
        if (zoom < 10)
           return 'L0' + zoom;
        else
           return 'L' + zoom;
  	  }
		});

		var skaermKort = L.tileLayer('http://{s}.services.kortforsyningen.dk/topo_skaermkort?' + pass + 'request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    attribution: 'Geodatastyrelsen',
	    continuousWorld: true,
	    maxZoom: 14,
	    zoom: function() {
        var zoom = $scope.map.getZoom();
        if (zoom < 10)
            return 'L0' + zoom;
        else
            return 'L' + zoom;
	    }
		}).addTo($scope.map);

		$scope.baselayers = {
	    "Flyfoto": ortofoto,
	    "Skærmkort": skaermKort
		};

		L.control.layers($scope.baselayers).addTo($scope.map);
	  $scope.map.addLayer(ortofoto);
		$scope.map.setView(L.latLng(-63.30460696647067, 231.29616513848302), 5);
		//$scope.map.setView(L.latLng(-63.30460696647067, 231.29616513848302), 5);
		$scope.map.setZoom(2);

		/*
		var polygon = L.polygon([
	    [-64.509, 231.08],
	    [-51.503, 0.06],
	    [-61.51, 213.047]
		]).addTo($scope.map);
		*/

	  $scope.map.on('click', function(e) {
			//console.log(e);
		})
				
		}

		$scope.extractLatLng = function(geometryWkt) {
			var latLngs = geometryWkt.match(/(\d+).(\d+)/g)	
			return L.latLng(latLngs[1], latLngs[0])
		}

		$scope.wetland = {};
		$scope.$watch('wetland', function() {
			console.log('WWWW', arguments);
		}, true)

		$scope.initWetland = function() {
		$('#lokalitet').typeahead({
			displayText: function(item) {
				return splice(item.presentationString, item.presentationString.indexOf('(')+1, item.subtype+', ')
			},
			afterSelect: function(item) {
				$scope.wetland = item;
				var popup = L.popup()
			    //.setLatLng(L.latLng(-63.30460696647067, 231.29616513848302))
					.setLatLng($scope.extractLatLng(item.geometryWkt))
			    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
			    .openOn($scope.map);
			}, 
			items : 20,
		  source: function(query, process) {
				//TODO: run service with tickets instead of hardcoded username / password
				var pass = "&login=davidkonrad&password=nhmdzm",
						url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&crs=EPSG:4326&resources=stednavne_v2&limit=100'+pass;
	
		    return $.getJSON(url, function(resp) {
					var data = [], 
							caption = '',
							//TODO, remov - for curiosity only 
							noWater = ['spredtBebyggelse', 'bydel', 'by', 'gård', 'sten', 'bro', 'hus', 'kløft', 'andenBygning', 'dal', 
												'museumSamling', 'agerMark', 'eng', 'hede', 'gravhøj', 'højdedrag', 'bakke', 'campingsplads', 'slugt',
												'kirkeProtestantisk', 'hal', 'skovPlantage', 'stadion', 'vejrmølle', 'udsigtstårn', 'golfbane', 
												'folkeskole', 'folkehøjskole', 'turistbureau', 'vejbro', 'mindesten', 'langdysse', 'specialskole',
												'voldVoldsted', 'privatskoleFriskole', 'kommunekontor', 'dyrepark', 'grænsestenGrænsepæl', 'hotel',
												'andenSeværdighed', 'udsigtspunkt', 'tog', 'boplads', 'øgruppe', 'fagskole', 'fyrtårn', 'blomsterpark',
												'universitet', 'professionshøjskole', 'kursuscenter', 'uddannelsescenter', 'zoologiskHave',
												'kirkeAndenKristen', 'herregård', 'storby', 'kolonihave', 'land', 'gravsted', 'kraftvarmeværk', 
												'undersøiskGrund', 'odde', 'klint', 'halvø', 'rådhus', 'skydebane', 'flyveplads', 'parkAnlæg', 'ø',
												'sommerhusområde', 'goKartbane', 'dysse', 'løb', 'ruin', 'reservat', 'mindreLufthavn', 'pynt', 'hage',
												'gymnasium', 'industriområde', 'feriecenter', 'efterskoleUngdomsskole', 'kristen', 'rastepladsMedService',
												'klippeIOverfladen', 'rastepladsUdenService', 'sommerhusområdedel', 'røse', 'køretekniskAnlæg', 
												'runddysse', 'landingsplads', 'fængsel', 'bilfærge', 'næs', 'højBanke', 'jættestue', 'vandrerhjem',
												'sandKlit', 'vandkraftværk', 'hule', 'trafikhavn', 'vindmøllepark', 'fæstningsanlæg', 'motorbane',
												'strand', 'vej', 'hospital', 'båke', 'skanse', 'runesten', 'vikingeborg', 'slot', 'historiskMindeHistoriskAnlæg',
												'veteranjernbane', 'cykelbane', 'terminal', 'bredning', 'motorvejskryds', 'skær', 'skibssætning', 
												'skræntNaturlig', 'motocrossbane', 'forlystelsespark', 'marsk', 'personfærge', 'svæveflyveplads',
												'hundevæddeløbsbane', 'varde', 'primærRingvej', 'sekundærRingvej', 'restriktionsareal', 'landsdel',
												'overskylledeSten', 'vejkryds', 'lavning', 'arboret', 'løvtræ', 'bautasten', 'bautasten', 
												'sti', 'plads', 'heliport', 'hestevæddeløbsbane', 'ledLåge', 'ås', 'observatorium', 'fiskerihavn',
												'sejlløb', 'nor', 'tomt'
											],
							types = ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump',
											//doubtful matches
											'bugt', 'strandpost', 'lystbådehavn', 'sund', 'vandmølle', 'tørtVedLavvande', 'botaniskHave'
											]

					//console.log(resp);
					for (var i in resp.data) {
						if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
							data.push(resp.data[i]);
						} else {
							if (!~noWater.indexOf(resp.data[i].subtype)) console.log(resp.data[i].subtype);
						}
					}			
					return process(data);		
		    })
		  }
		})
	}

  }]);
