'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', '$timeout', 'Auth', 'Projekt', 'Klasse', 'Klassetrin', 'Fag', 'Taxon', 'Projekt_taxon', 
	function ($scope, $http, $timeout, Auth, Projekt, Klasse, Klassetrin, Fag, Taxon, Projekt_taxon) { 

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
				$scope.loadProjektTaxons();
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

		$scope.loadProjektTaxons = function() {
			Projekt_taxon.query({ projekt_id: $scope.projekt_projekt_id }).$promise.then(function(projekt_taxons) {	
				$scope.projektTaxons = [];
				projekt_taxons.forEach(function(item) {
					if (item.projekt_id == $scope.projekt.projekt_id) $scope.projektTaxons.push(item);
				})
				$scope.loadTaxons();
			})
		}

		$scope.taxonIsIncluded = function(taxon_id) {
			var result =  { is_included: false, projekt_taxon_id: false };
			for (var i=0;i<$scope.projektTaxons.length; i++) {
				var item = $scope.projektTaxons[i];
				if (item.taxon_id == taxon_id) {
					result.is_included = item.is_included;
					result.projekt_taxon_id = item.projekt_taxon_id;
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
						projekt: $scope.taxonIsIncluded(taxon.taxon_id)
					})
				})
				console.log($scope.taxons);
			})
		}
	
		$scope.projektTaxonToggle = function(art) {
			console.log(art);
			if (art.projekt.is_included) {
				if (art.projekt.projekt_taxon_id) {
					Projekt_taxon.update({ projekt_taxon_id: art.projekt.projekt_taxon_id, is_included: true })
				} else {
					Projekt_taxon.save({ projekt_taxon_id: ''}, { projekt_id: $scope.projekt.projekt_id, taxon_id: art.taxon_id })
				}
			} else {
				Projekt_taxon.update({ projekt_taxon_id: art.projekt.projekt_taxon_id, is_included: false})
			}
		}

		Projekt_taxon.query({ projekt_id: $scope.projekt_projekt_id} ).$promise.then(function(projekt_taxons) {	
			//console.log('pt', projekt_taxons);
		})

	/*
	 * lokalitet map
   */

/*var kmsticket = new VisStedet.Ticket();

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

		var polygon = L.polygon([
	    [-64.509, 231.08],
	    [-51.503, 0.06],
	    [-61.51, 213.047]
		]).addTo($scope.map);

		 // $scope.map.addLayer(ortofoto);

/*
			var protocol  = ("https:" == document.location.protocol) ? "https" : "http";
			var osmUrl=protocol + '://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		  var osmAttrib='Map data &copy; OpenStreetMap contributors';
		  var osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});
			$scope.map.setView(new L.LatLng(55.0014602722233, 14.9985934015052),16);
		  $scope.map.addLayer(osm);
  */
 
		  $scope.map.on('click', function(e) {
				console.log(e);
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
				//geometryWkt
				//console.log(item.geometryWkt.match(/^\d+/g));
				console.log($scope.extractLatLng(item.geometryWkt));
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
				var login = "davidkonrad", 
						password = "nhmdzm",
						url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&crs=EPSG:4326&resources=stednavne_v2&limit=100&login='+login+'&password='+password;
	
		    return $.getJSON(url, function(resp) {
					var data = [], 
							caption = '', 
							types = ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump']

					console.log(resp);
					for (var i in resp.data) {
						if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
							data.push(resp.data[i]);
						} else {
							//console.log(resp.data[i].subtype);
						}
					}			
					return process(data);		
		    })
		  }
		})
	}

  }]);
