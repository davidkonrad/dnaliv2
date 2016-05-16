'use strict';

angular.module('dnalivApp')
  .factory('LokalitetModal', ['$modal', '$q', '$timeout', 'Utils', 'Geo', 'Lokalitet', 'Lokalitet_spot', 
		function($modal, $q, $timeout, Utils, Geo, Lokalitet, Lokalitet_spot) {

		var lokalitet = {
			locked: false,
			showMarker: true,
			latitude: 55.685255690177826, 
			longitude: 12.572981195446564
		};

		var map = null,
				lokalitetPolygon = null,
				lokalitetMarker = null;

		//we assume Wkt is loaded
		var wkt = new Wkt.Wkt()

		function geometryWktPolygon($scope, geometryWkt) {
			console.log(arguments)
			wkt.read(geometryWkt);
			for (var p in wkt.components) {
				var a = wkt.components[p].map(function(xy) {
				var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
				return [latLng.lng, latLng.lat]
				})
			}
			return L.polygon(a, {
				fillColor: '#FFFF00',
				color: '#FFFF00'
			}).addTo(map)
		}

		function initializeWetland($scope) {
			$('#lokalitet_wetland').typeahead({
				displayText: function(item) {
					return splice(item.presentationString, item.presentationString.indexOf('(')+1, item.subtype+', ')
				},
				afterSelect: function(item) {
					Utils.mergeObj(lokalitet, item);
					lokalitetPolygon = geometryWktPolygon($scope, item.geometryWkt)
					var center = lokalitetPolygon.getBounds().getCenter()
					$scope.setLokalitetLatLng(center) 
					lokalitetMarker.setLatLng(center)
					var popup = new L.popup()
						.setLatLng(center) 
				    .setContent(
							'<h4>' + item.skrivemaade_officiel + '</h4>' +
							'<p>'  + item.skrivemaade_officiel + '</p>' 
						)
				    .openOn(map);
		
					map.fitBounds(lokalitetPolygon.getBounds(), { maxZoom: 10 } )
					/* far better than $scope.map.setView(center, 8, { reset: true	}) */
				}, 
				items : 20,
			  source: function(query, process) {
					var url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&resources=stednavne_v2&limit=100'+Utils.aePass;
			    return $.getJSON(url, function(resp) {
						var data = [], caption = '';
						for (var i in resp.data) {
							if (~Utils.aeWaterTypes.indexOf(resp.data[i].type) || ~Utils.aeWaterTypes.indexOf(resp.data[i].subtype)) {
								data.push(resp.data[i]);
							} else {
								if (!~Utils.aeNoWater.indexOf(resp.data[i].subtype)) {
									//TODO stop logging unknown ae types
									console.log(resp.data[i].subtype);
								}
							}
						}			
						return process(data);		
			    })
			  }
			})
		}

		function createMap(withCRS) {
			var options = {
				inertia: false
			}
			if (withCRS) {
				options.crs = new L.Proj.CRS.TMS('EPSG:25832',
			    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
			      resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1]
				});
			}
			map = new L.Map('map', options);
			/*
			} else {
				map = new L.Map('map') //, { crs: crs });
			}
			*/
		}

		function initializeMap($scope) {

			/*
			var crs = new L.Proj.CRS.TMS('EPSG:25832',
		    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
		      resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1]
			});
	
			//$scope.map = new L.Map('map', { crs: crs });
			$scope.map = new L.Map('map') //, { crs: crs });
			*/

			createMap()

			var luftFoto = new L.tileLayer('http://{s}.services.kortforsyningen.dk/orto_foraar?request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
				attribution: 'Geodatastyrelsen',
		    continuousWorld: false,
			  maxZoom: 14,
			  zoom: function () {
					var zoom = map.getZoom();
					if (zoom < 10)
						return 'L0' + zoom;
					else
						return 'L' + zoom;
				}
			})

			var HERE_hybridDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
				attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
				subdomains: '1234',
				mapID: 'newest',
				app_id: 'WQbz8ksVFNn4Y8ibFJ5M',
				app_code: 'AV5ngGiwOzQyWmvyF1Hm1g',
				base: 'aerial',
				maxZoom: 20,
				type: 'maptile',
				language: 'eng',
				format: 'png8',
				size: '256'
			})

			var skaermKort = L.tileLayer('http://{s}.services.kortforsyningen.dk/topo_skaermkort?request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
				attribution: 'Geodatastyrelsen',
				continuousWorld: false,
	  	  zoom: function() {
	  	    var zoom = map.getZoom();
	  	    if (zoom < 10)
	  	      return 'L0' + zoom;
	  	    else
	  	      return 'L' + zoom;
			   }
			}) 

			var Stamen_TonerLabels = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.{ext}', {
				attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			});
	
			var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
				continuousWorld: false,
			});

			var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
				maxZoom: 16,
				attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
				continuousWorld: false
			});

			var Thunderforest_Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				continuousWorld: false
			});

			var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
				attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
				continuousWorld: false
			});

			var HERE_normalDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/normal.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
				attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
				subdomains: '1234',
				mapID: 'newest',
				app_id: 'WQbz8ksVFNn4Y8ibFJ5M',
				app_code: 'AV5ngGiwOzQyWmvyF1Hm1g',
				base: 'base',
				maxZoom: 20,
				type: 'maptile',
				language: 'eng',
				format: 'png8',
				size: '256'
			});

			var baseLayers = {
		    "Orto Foraar": luftFoto,
		    "Skærmkort": skaermKort,
		    'HERE_hybridDay': HERE_hybridDay,
				'HERE_normalDay': HERE_normalDay,
				'Thunderforest_Outdoors': Thunderforest_Outdoors,
				'Esri_WorldTopoMap': Esri_WorldTopoMap,
				'Esri_WorldImagery': Esri_WorldImagery
			}
			var overlayLayers = {
		    'Stamen_TonerLabels': Stamen_TonerLabels
			}

			L.control.layers(baseLayers, overlayLayers).addTo(map);
			
			var center = L.latLng(lokalitet.latitude, lokalitet.longitude) 
	
			//$scope.map.addLayer(HERE_hybridDay); //skaermkort
			map.setView(center, 18);

			/*
			if (lokalitet) {
			  $scope.map.addLayer(luftFoto);
				$scope.map.setView(center, 11);
				if (lokalitet.geometryWkt) lokalitetPolygon = geometryWktPolygon($scope, lokalitet.geometryWkt)
			} else {
			  $scope.map.addLayer(HERE_hybridDay); //skaermkort
				$scope.map.setView(center, 10);
			}
			*/

			/**
				populate $scope with some event listeners and functions
			**/
			$scope.setLokalitetLatLng = function(latlng) {
				document.querySelector('#lat').value = latlng.lat
				document.querySelector('#lng').value = latlng.lng
				lokalitet.latitude = latlng.lat
				lokalitet.longitude = latlng.lng
			}

	  	map.on('click', function(e) {
				console.log(e)
				if (!lokalitet.locked) {
					$scope.setLokalitetLatLng(e.latlng) 
					lokalitetMarker.setLatLng(e.latlng)
				}
			})

			map.on('baselayerchange', function(e) {
				console.log(e)
			})

			map.on('zoomend', function(e) {
				console.log('zoom', e)
			})

			lokalitetMarker = L.marker(center, {
				draggable: true
			})
			.addTo(map)
			.on('dragend', function(e) {
				if (!lokalitet.locked) {
					$scope.setLokalitetLatLng(e.target._latlng) 
				} else {
					lokalitetMarker.setLatLng({ 
						lat: lokalitet.latitude,
						lng: lokalitet.longitude
					})
				}
			})

			$scope.showMarker = function() {
				if (lokalitet.showMarker) {
					lokalitetMarker.setOpacity(1)
				} else {
					lokalitetMarker.setOpacity(0)
				}
			}

			$scope.showPolygon = function() {
				if (lokalitet.showPolygon) {
					map.addLayer(lokalitetPolygon)
				} else {
					map.removeLayer(lokalitetPolygon)
				}
			}

			$scope.centerMarker = function() {
				map.setView(L.latLng(lokalitet.latitude, lokalitet.longitude), 11)
			}

			/*
			$scope.$watch('lokalitet.locked', function() {
				document.querySelector('#lokalitet_wetland').readOnly = $scope.lokalitet.locked
			})
			*/

		}

		var deferred = null,
				modal = null;

		return {
			
			show: function($scope) {

				deferred = $q.defer()

				modal = $modal({
					scope: $scope,
					templateUrl: 'app/lokalitet/lokalitet.modal.html',
					backdrop: 'static',
					show: true,
					TEST: 'test'
				})
				modal.internalName = 'lokalitetModal'

				$scope.$on('modal.show', function(e, target) {
					if (target.internalName == 'lokalitetModal' && !modal.initialized) {
						initializeMap($scope)
						initializeWetland($scope)
						modal.initialized = true
					}
				})
				$scope.$on('modal.hide', function(e, target) {
					if (target.internalName == 'lokalitetModal') {
						console.log('HIDE')
					}
				})

				$scope.proeveNrClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.proeveNrModal.proeve_nr : false)
				}

	      return deferred.promise;
			}

		}

	}]);

	
