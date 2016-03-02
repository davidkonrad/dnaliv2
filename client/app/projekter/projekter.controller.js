'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', '$timeout', 'Auth', 'Projekt', 'Klasse', 'Klassetrin', 'Fag', 'Taxon', '$tab', 
	function ($scope, $http, $timeout, Auth, Projekt, Klasse, Klassetrin, Fag, Taxon, $tab) { 

		var getObj = function($resource, prefix) {
			var exclude = ['$promise','$resolved','toJSON','$get','$save','$query','$remove','$delete','$update'],
					prop, p = {};
			for (prop in $resource) {
				if (prefix) {
					if (~prop.indexOf(prefix)) p[prop] = $resource[prop]
				} else {
					if (~exclude.indexOf(prop)) p[prop] = $resource[prop]
				}
			}
			return p;
		}

		$scope.projekt = {};
		$scope.projekter = [];
		$scope.projectLoaded = function() {
			return !angular.isDefined($scope.projekt.projekt_kode)
    }
		$scope.klasser = [{ institution: '... ' }	];

		/*
		$scope.activeTab = 'lokalitet';
		$scope.$watch('activeTab', function() {
			console.log($scope.activeTab);
		}, true)
		$timeout(function() {
			$scope.activeTab = 'generelt';
		},500)
		*/

		$timeout(function() {
			//$scope.initializeMap();
		})

		Projekt.query().$promise.then(function(projekter) {	
			$scope.projekter = projekter.map(function(projekt) {
				return projekt
			})
			$('.projekt-typeahead').typeahead({
				showHintOnFocus: true,
				source: $scope.projekter,
				displayText: function(item) {
					return item.projekt_kode
				},
				afterSelect: function(item) {
					$scope.loadProjekt(item.projekt_id)
				}
			})
		})

	/**
	 * Create a new projekt and load it
	 */
		$scope.createProjekt = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_id: '' }, { projekt_kode: kode }).$promise.then(function(projekt) {	
				$scope.loadProjekt(projekt.projekt_id)
			})
		}

	/**
	 * Load a projekt
	 * @param {int} projekt_id - unique projekt_id of the projekt
	 */
		$scope.loadProjekt = function(projekt_id) {
			Projekt.get({ id: projekt_id }).$promise.then(function(projekt) {	
				$scope.projekt = getObj(projekt, 'projekt_')
				$scope.loadKlasser(projekt.projekt_id)
				document.querySelector('.projekt-typeahead').value = projekt.projekt_kode
			})
		}

	/**
	 * Save current projekt
	 */
		$scope.saveProjekt = function() {
			Projekt.update({ projekt_id: $scope.projekt.projekt_id }, $scope.projekt)
		}

	/**
	 * Reload and filter the klasser array
	 * @param {int} projekt_id - unique projekt_id of the projekt
	 */
		$scope.loadKlasser = function(projekt_id) {
			Klasse.query({ projekt_id: projekt_id }).$promise.then(function(klasser) {	
				$scope.klasser = klasser.filter(function(klasse) {
					if (klasse.projekt_id == projekt_id) {
						klasse.edited = false
						return klasse
					}
				})
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
	 * Attach a new klasse to the current projekt
	 */
		$scope.createKlasse = function() {
			Klasse.save({ klasse_id: '' }, { projekt_id: $scope.projekt.projekt_id }).$promise.then(function(klasse) {
				$scope.loadKlasser($scope.projekt.projekt_id)
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

		Taxon.query().$promise.then(function(taxons) {	
			//console.log('Taxon', taxons);
		})

		
	/*
	 * lokalitet map
   */
		$scope.map = false;
		$scope.initializeMap = function() {
			if ($scope.map && $scope.map._leaflet_id) { 
				$scope.map.invalidateSize();
				return
			}
			$scope.map = L.map('map');
			var protocol  = ("https:" == document.location.protocol) ? "https" : "http";
			var osmUrl=protocol + '://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		  var osmAttrib='Map data &copy; OpenStreetMap contributors';
		  var osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
			$scope.map.setView(new L.LatLng(55.0014602722233, 14.9985934015052),16);
		  $scope.map.addLayer(osm);

		  $scope.map.on('click', function(e) {
				console.log(e);
			})
				
		}

		/*
		$scope.mapOptions = {
	    center: {
	      lat: 56,
	      lng: 11.5,
	      zoom: 7
	    },
	    drawControl: true,
	    markers: {},
			attributionControl: true,
	    layers: {
	      baselayers: {
	        osm: {
	          name: 'Kort',
	          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	          type: 'xyz'
	        },
	        topo_25: {
          name: "DK 4cm kort",
          type: 'wms',
          visible: true,
          url: "http://kortforsyningen.kms.dk/topo_skaermkort",
          layerOptions: {
            layers: "topo25_klassisk",
            servicename: "topo25",
            version: "1.1.1",
            request: "GetMap",
            format: "image/jpeg",
            service: "WMS",
            styles: "default",
            exceptions: "application/vnd.ogc.se_inimage",
            jpegquality: "80",
            attribution: "Indeholder data fra GeoDatastyrelsen, WMS-tjeneste",
            //ticket: KMS.getTicket()
          }
        },
        luftfoto: {
          name: "DK luftfoto",
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
            //ticket: KMS.getTicket()
          }
        },
        WorldImagery: {
          name: 'WorldImagery',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
          type: 'xyz',
          visible: true,
          layerOptions: {
            token: 'Fa8k0Foc5-cHunXdR4tEkZi-D4Ir0lwassp-4ZVZtQA6FeUHLz5knK6Rbpi-qT_BoyuNZh4SWDFD3YoaBlpr39RXyt5i43ptwtLpSImYNFZ0T8g3g-2fwahONMcc7aYlFAD9o3WOOE7TW0MTngKX1w..', //ArcGis.getTicket(),
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }
        },
        WorldTopoMap: {
          name: 'WorldTopoMap',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png',
          type: 'xyz',
          visible: true,
          layerOptions: {
            token: 'Fa8k0Foc5-cHunXdR4tEkZi-D4Ir0lwassp-4ZVZtQA6FeUHLz5knK6Rbpi-qT_BoyuNZh4SWDFD3YoaBlpr39RXyt5i43ptwtLpSImYNFZ0T8g3g-2fwahONMcc7aYlFAD9o3WOOE7TW0MTngKX1w..', //ArcGis.getTicket(),
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
          }
        }
      }
    }
	}
		*/

		console.log($scope);

  }]);
