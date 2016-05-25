'use strict';

angular.module('dnalivApp')
  .factory('LokalitetModal', ['$modal', '$q', '$timeout', '$popover', 'Alert', 'InputModal', 'Utils', 'Geo', 'Lokalitet', 'Lokalitet_spot', 
		function($modal, $q, $timeout, $popover, Alert, InputModal, Utils, Geo, Lokalitet, Lokalitet_spot) {

		var yellowIcon = L.icon({
	    iconUrl: 'assets/images/yellow.png',
			iconAnchor: [14, 41], 
			popupAnchor: [0, -51] 
		})

		var BM = {
			lat: 55.685255690177826, 
			lng: 12.572981195446564
		}

		var defaultLokalitet = {
			edited: false, //main locality changed
			locked: false,
			hasHotspots: false,
			hotspotsLocked: false,
			showMarker: true,
			//showPopup: false,
			showHotspotMarkers: false,
			showHotspotPopups: false,
			showHotspotPolygon: true,
			latitude: BM.lat, 
			longitude: BM.lng,
			Spots: [],
			//db fields
			presentationString: 'BM',
			geometryWkt: '',
			type: '',
			subtype: '',
			skrivemaade: '',
			skrivemaade_officiel: '',
			skrivemaader_uofficiel: ''
		};

		var map = null,
				hotspotPopover = null,
				updatePopover = null,
				isCreating = false,
				lokalitetPolygon = null,
				lokalitetMarker = null,
				hotspotPopups = null,
				hotspotMarkers = null,
				hotspotPolygon = null;

		//we assume Wkt is loaded
		var wkt = new Wkt.Wkt()

		function geometryWktLatLng(geometryWkt) {
			wkt.read(geometryWkt);
			if (!wkt.components[0].length) return L.latLng(BM)
			var xy = wkt.components[0][0]
			return Geo.EPSG25832_to_WGS84(xy.x, xy.y)
		}

		function geometryWktPolygon(geometryWkt) {
			wkt.read(geometryWkt);
			var polygonOptions = {
				fillColor: '#ffff00',
				color: '#ffff00',
				weight: 3,
				fillRule: 'nonzero'
			}
			var center = []
			var polygons = []

			if (wkt.components[0].length) {
				for (var p=0; p<wkt.components.length;p++) {
					var points = wkt.components[p].map(function(xy) {
						var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
						return [latLng.lng, latLng.lat]
					})
					center = center.concat(points)
					polygons.push(L.polygon(points, polygonOptions))
				}
			} else {
				var points = wkt.components.map(function(xy) {
					var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
					return [latLng.lng, latLng.lat]
				})
				center = center.concat(points)
				polygons.push(L.polygon(points, polygonOptions))
			}
			var layer = L.layerGroup(polygons).addTo(map),
					center = L.polygon(center);

			layer.__center = center.getBounds().getCenter()
			layer.__bounds = center.getBounds()

			return layer
		}

		//bad bad bad :(
		function initializeHotspotEvents($scope) {

			$(document).on('click', '.spot-delete', function() {
				var lokalitet_spot_id = $(this).attr('spot-id')
				if (!lokalitet_spot_id) return
					Alert.show($scope, 'Slet indsamlingssted', 'Slet indsamlingsstedet - er du sikker?').then(function(confirm) {
						if (confirm) {
						Lokalitet_spot.delete({ id: lokalitet_spot_id }).$promise.then(function() {
							Lokalitet.get({ id: $scope.__lokalitet.lokalitet_id }).$promise.then(function(lokalitet) {
								setLokalitet($scope, lokalitet)	
							})
						})
					}
				})
			})

			$(document).on('click', '.spot-edit', function() {
				var lokalitet_spot_id = $(this).attr('spot-id'),
						beskrivelse = unescape($(this).attr('spot-beskrivelse'));

				InputModal.show($scope,'Rediger', ' Ny beskrivelse', beskrivelse).then(function(result) {	
					if (result) {
						Lokalitet_spot.update({ id: lokalitet_spot_id }, { beskrivelse: result }).$promise.then(function() {
							Lokalitet.get({ id: $scope.__lokalitet.lokalitet_id }).$promise.then(function(lokalitet) {
								setLokalitet($scope, lokalitet)	
							})
						})
					}
				})
			})					
		}

		function createHotspotMarkers($scope, lokalitet) {

			var getPopupContent = function(spot) {
				var content = '<h5>' + spot.beskrivelse + '</h5>'
				content += '<hr>'
				content += '<button class="btn btn-danger btn-xs spot-delete" spot-id="'+spot.lokalitet_spot_id+'" style="font-size:90%;" title="Fjern"><i class="fa fa-remove"></i></button>'
				content += '&nbsp;&nbsp;'
				content += '<button class="btn btn-primary btn-xs spot-edit" spot-id="'+spot.lokalitet_spot_id+'" spot-beskrivelse="'+escape(spot.beskrivelse)+'"><i class="fa fa-edit" title="Rediger"></i></button>'
				return content
			}

			if (hotspotMarkers) map.removeLayer(hotspotMarkers)
			if (hotspotPopups) map.removeLayer(hotspotPopups)
			hotspotMarkers = []
			hotspotPopups = []

			$scope.__lokalitet.hasHotspots = $scope.__lokalitet.Spot && $scope.__lokalitet.Spot.length > 0
			if (!$scope.__lokalitet.hasHotspots) return

			lokalitet.Spot.forEach(function(spot) {
				var latlng = L.latLng(spot.latitude, spot.longitude)
				var popup = L.popup()
						.setLatLng(latlng)
				    .setContent(getPopupContent(spot))

				var marker = L.marker([spot.latitude, spot.longitude], { 
						lokalitet_spot_id: spot.lokalitet_spot_id,
						icon: yellowIcon,
						draggable: !$scope.__lokalitet.hotspotsLocked
				})
				.on('dragend', function(e) {
					var lokalitet_spot_id = e.target.options.lokalitet_spot_id
					Lokalitet_spot.update({ id: lokalitet_spot_id }, {
						latitude: e.target._latlng.lat,
 						longitude: e.target._latlng.lng
					}).$promise.then(function(newSpot) {
						for (var i=0; i<$scope.__lokalitet.Spot.length; i++) {
							if ($scope.__lokalitet.Spot[i].lokalitet_spot_id == newSpot.lokalitet_spot_id) {
								$scope.__lokalitet.Spot[i].latitude = newSpot.latitude
								$scope.__lokalitet.Spot[i].longitude = newSpot.longitude
							}
						}
						if ($scope.__lokalitet.showHotspotPolygon) {
						 createHotspotPolygon($scope, $scope.__lokalitet)
						}
						//call itself to update markers
						createHotspotMarkers($scope, $scope.__lokalitet)
					})
				})
				hotspotMarkers.push(marker)
				hotspotPopups.push(popup)
			})
			hotspotMarkers = L.layerGroup(hotspotMarkers)
			if ($scope.__lokalitet.showHotspotMarkers) {
				hotspotMarkers.addTo(map)
			}

			hotspotPopups = L.layerGroup(hotspotPopups)
			if ($scope.__lokalitet.showHotspotPopups) {
				hotspotPopups.addTo(map)
			}

			if ($scope.__lokalitet.showHotspotPolygon) {
			 createHotspotPolygon($scope, $scope.__lokalitet)
			}
		}

		function createHotspotPolygon($scope, lokalitet) {
			if (hotspotPolygon) map.removeLayer(hotspotPolygon)
			if (lokalitet.Spot.length < 2) return

			hotspotPolygon = []
			lokalitet.Spot.forEach(function(spot) {
				hotspotPolygon.push([parseFloat(spot.latitude), parseFloat(spot.longitude)])
			})

			hotspotPolygon = L.polygon(hotspotPolygon, {
				fillColor: '#00FF00',
				color: '#00FF00',
				weight: 3,
				fillOpacity: 0.6
			}).addTo(map)
		}

		function setLokalitet($scope, lokalitet) {
			var obj = angular.copy(defaultLokalitet)
			Utils.mergeObj(obj, lokalitet)

			//preserve current settings
			if ($scope.__lokalitet) {
				obj.locked = $scope.__lokalitet.locked
				obj.hotspotsLocked = $scope.__lokalitet.hotspotsLocked
				obj.showMarker = $scope.__lokalitet.showMarker
				obj.showHotspotMarkers = $scope.__lokalitet.showHotspotMarkers
				obj.showHotspotPopups = $scope.__lokalitet.showHotspotPopups
				obj.showHotspotPolygon = $scope.__lokalitet.showHotspotPolygon
			}
						
			//ensure valid lat, lng
			if (!obj.latitude || !obj.longitude) {
				obj.latitude = BM.lat
				obj.longitude = BM.lng
			}

			obj.hasHotspots = obj.Spot.length > 0

			$scope.__lokalitet = obj
		
			if (lokalitet.geometryWkt && lokalitet.geometryWkt != '') {
				lokalitetPolygon = geometryWktPolygon(lokalitet.geometryWkt)
			}	
			createLokalitetPopup(lokalitet) 
			createHotspotMarkers($scope, lokalitet)
		}

		function createLokalitetPopup(lokalitet) {
			var desc = '<h4>' + lokalitet.presentationString + '</h4>' 
			desc += lokalitet.type ? lokalitet.type : ''
			desc += lokalitet.subtype && lokalitet.subtype!=lokalitet.type ? ' (' + lokalitet.subtype + '). '  : '. '
			desc += lokalitet.skrivemaade ? lokalitet.skrivemaade : ''
			desc += lokalitet.skrivemaade_uofficiel ? '(' + lokalitet.skrivemaade_uofficiel + '). '  : '. '

			lokalitetMarker.bindPopup(desc).openPopup();
		}
	
		function initializeWetland($scope) {
			$('#lokalitet_wetland').typeahead({
				displayText: function(item) {
					return splice(item.presentationString, item.presentationString.indexOf('(')+1, item.subtype+', ')
				},
				afterSelect: function(item) {
					Utils.mergeObj($scope.__lokalitet, item);
					if (lokalitetPolygon) map.removeLayer(lokalitetPolygon)

					if (item.geometryWkt == '') {
						Alert.show($scope, 'Der er ingen geodata knyttet til '+item.presentationString).then(function() {

						})
					} else {
						lokalitetPolygon = geometryWktPolygon(item.geometryWkt)
						var center = geometryWktLatLng(item.geometryWkt)
						$timeout(function() {
							var center = lokalitetPolygon.__center
							map.fitBounds(lokalitetPolygon.__bounds, { maxZoom: 20 } )
							map.setView(center)
							$scope.setLokalitetLatLng(center) 
							createLokalitetPopup(item) 
							$timeout(function() {
								map.invalidateSize()
							})
						}, 100)
					}
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
									console.log('Unregistered subtype: ', resp.data[i].subtype);
								}
							}
						}			
						return process(data);		
			    })
			  }
			})
		}

		function createMap(withCRS) {
			if (map) {
				map.remove()
				map = null
			}
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
		}

		function initializeMap($scope) {
			createMap()
			var luftFoto = new L.tileLayer('http://{s}.services.kortforsyningen.dk/orto_foraar?request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
				attribution: 'Geodatastyrelsen',
			  maxZoom: 14,
				useCrs : true,
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
			}).addTo(map)

			//var skaermKort = L.tileLayer('http://{s}.services.kortforsyningen.dk/topo_skaermkort?request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
			var skaermKort = L.tileLayer('http://{s}.services.kortforsyningen.dk/topo_skaermkort?request=GetTile&version=1.0.0&service=WMS&Layer=dtk_skaermkort&style=default&format=image/jpeg'+Utils.aePass, {
				attribution: 'Geodatastyrelsen',
				useCrs : true,
	  	  zoom: function() {
	  	    var zoom = map.getZoom();
	  	    if (zoom < 10)
	  	      return 'L0' + zoom;
	  	    else
	  	      return 'L' + zoom;
			   }
			}) 

			var OpenStreetMap =  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
				maxZoom: 18,
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
		    //"Orto Foraar": luftFoto,
		    //"Skærmkort": skaermKort,
		    'HERE_hybridDay': HERE_hybridDay,
				'HERE_normalDay': HERE_normalDay,
				'OpenStreetMap': OpenStreetMap,
				'Thunderforest_Outdoors': Thunderforest_Outdoors,
				'Esri_WorldTopoMap': Esri_WorldTopoMap,
				'Esri_WorldImagery': Esri_WorldImagery
			}
			var overlayLayers = {
		    'Stamen_TonerLabels': Stamen_TonerLabels
			}

			L.control.layers(baseLayers, overlayLayers).addTo(map);
			var center = L.latLng($scope.__lokalitet.latitude, $scope.__lokalitet.longitude) 
			map.setView(center, 18);


			/**
				populate $scope with some event listeners and functions
			 */
	  	map.on('click', function(e) {
				if ($scope.__isCreatingHotSpot) {
					hotspotPopover.hide()
					$scope.__isCreatingHotSpot = false
					InputModal.show($scope,'Opret indsamlingssted ..', 'Navn / beskrivelse').then(function(beskrivelse) {	
						if (beskrivelse) {
							var lokalitet_spot = {
								lokalitet_id: $scope.__lokalitet.lokalitet_id,
								latitude: e.latlng.lat,
								longitude: e.latlng.lng,
								beskrivelse: beskrivelse
							}
							Lokalitet_spot.save({ lokalitet_spot_id: ''}, lokalitet_spot).$promise.then(function(ls) {
								$scope.__lokalitet.Spot.push(ls)
								createHotspotMarkers($scope, $scope.__lokalitet) 
							})
						}
					})
				}
				if (!$scope.__lokalitet.locked) {
					$scope.setLokalitetLatLng(e.latlng) 
					lokalitetMarker.setLatLng(e.latlng)
				}
			})

			map.on('baselayerchange', function(e) {
			})

			map.on('zoomend', function(e) {
			})

			lokalitetMarker = L.marker(center, {
				draggable: true
			})
			.addTo(map)
			.on('dragend', function(e) {
				if (!$scope.__lokalitet.locked) {
					$scope.setLokalitetLatLng(e.target._latlng) 
				} else {
					lokalitetMarker.setLatLng({ 
						lat: $scope.__lokalitet.latitude,
						lng: $scope.__lokalitet.longitude
					})
				}
			})

			$scope.showMarker = function() {
				if ($scope.__lokalitet.showMarker) {
					lokalitetMarker.setOpacity(1)
					lokalitetMarker.openPopup()
				} else {
					lokalitetMarker.setOpacity(0)
					lokalitetMarker.closePopup()
				}
			}

			$scope.createHotspot = function() {
				$scope.__isCreatingHotSpot = true
				hotspotPopover.show()
				//
 			}

			$scope.showPolygon = function() {
				if (!lokalitetPolygon) return
				if ($scope.__lokalitet.showPolygon) {
					map.addLayer(lokalitetPolygon)
				} else {
					map.removeLayer(lokalitetPolygon)
				}
			}

			$scope.hasPolygon = function() {
				return lokalitetPolygon == undefined
			}

			$scope.showHotspotMarkers = function() {
				if (!hotspotMarkers) return
				if ($scope.__lokalitet.showHotspotMarkers) {
					hotspotMarkers.addTo(map)
				} else {
					map.removeLayer(hotspotMarkers)
				}
			}

			$scope.showHotspotPopups = function() {
				if (!hotspotPopups) return
				if ($scope.__lokalitet.showHotspotPopups) {
					map.addLayer(hotspotPopups)
				} else {
					map.removeLayer(hotspotPopups)
				}
			}

			$scope.hotspotsLockedChange = function() {						
				createHotspotMarkers($scope, $scope.__lokalitet) 
			}

			$scope.showHotspotPolygon = function() {
				if ($scope.__lokalitet.showHotspotPolygon) {
					createHotspotPolygon($scope, $scope.__lokalitet)
				} else {
					if (!hotspotPolygon) return
					map.removeLayer(hotspotPolygon)
				}
			}

			$scope.$watchGroup(['__lokalitet.latitude', '__lokalitet.longitude'], function(newVal, oldVal) {
				if (JSON.stringify(newVal) != JSON.stringify(oldVal) && lokalitetMarker != undefined) {
					var ll = L.latLng(newVal[0], newVal[1])
					//console.log(lokalitetMarker, ll)
					lokalitetMarker.setLatLng(ll)
					//map.setView(ll);
					$scope.__lokalitet.edited = true
				}
			})

			$scope.updateLokalitet = function() {
				Lokalitet.update({ id: $scope.__lokalitet.lokalitet_id }, $scope.__lokalitet).$promise.then(function(lokalitet) {
					$scope.__lokalitet.edited = false
				})
			}		

			$scope.resetLokalitet = function() {
				Alert.show($scope, 'Nulstil Lokalitet?', 'Dette vil fjerne indsamlingssteder og sætte lokaliteten til default.').then(function(confirm) {
					if (confirm) {
						$scope.__lokalitet.Spot.forEach(function(spot) {
							Lokalitet_spot.delete({ id: spot.lokalitet_spot_id })
						})
						var obj = angular.copy(defaultLokalitet)
						Lokalitet.update({ id: $scope.__lokalitet.lokalitet_id }, obj).$promise.then(function(lokalitet) {
							setLokalitet($scope, lokalitet)
						})
					}
				})
			}

			$scope.setLokalitetLatLng = function(latlng) {
				document.querySelector('#lat').value = latlng.lat
				document.querySelector('#lng').value = latlng.lng
				$scope.__lokalitet.latitude = latlng.lat
				$scope.__lokalitet.longitude = latlng.lng
				//
				$timeout(function() {
					$scope.__lokalitet.edited = true
				})
			}

			$scope.centerMarker = function() {
				if (lokalitetPolygon) {
					map.fitBounds(lokalitetPolygon.__bounds, { maxZoom: 20 } )
				} else if (hotspotPolygon) {
					map.fitBounds(hotspotPolygon.getBounds(), { maxZoom: 20 } )
				} else {
					map.panTo(L.latLng($scope.__lokalitet.latitude, $scope.__lokalitet.longitude), 17)
				}
			}

		}

		//modal
		var deferred = null,
				modal = null;

		return {
	
			defaultLokalitet : angular.copy(defaultLokalitet),

			show: function($scope, lokalitet_id) {

				map = null
				hotspotPopover = null
				updatePopover = null
				isCreating = false
				lokalitetPolygon = null
				lokalitetMarker = null
				hotspotPopups = null
				hotspotMarkers = null
				hotspotPolygon = null

				var modalName = 'lokalitetModal'

				//set default lokalitet upon loading
				$scope.__lokalitet = defaultLokalitet
				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/lokalitet/lokalitet.modal.html',
					backdrop: 'static',
					show: true,
					internalName: modalName,
					lokalitet_id: lokalitet_id
				})

				$scope.$on('modal.show', function(e, target) {
					if (target.$options.internalName == modalName && !modal.initialized) {
						initializeMap($scope)
						initializeWetland($scope)
						initializeHotspotEvents($scope)
						modal.initialized = true

						if (target.$options.lokalitet_id) {
							Lokalitet.get({ id: target.$options.lokalitet_id }).$promise.then(function(lokalitet) {
								setLokalitet($scope, lokalitet)
								$scope.__lokalitet.locked = true //set locked to false to prevent unattended changes of the map
								$timeout(function() {
									map.setView([$scope.__lokalitet.latitude, $scope.__lokalitet.longitude], 14, true)
								}, 100)
							})
						} else {
							//setLokalitet(defaultLokalitet)
						}

						hotspotPopover = $popover(angular.element('#createHotspot'), {
							content: 'Klik på kortet for at oprette et nyt indsamlingssted', 
							trigger: 'manual',
							placement: 'right'
						})

					}
				})

				$scope.$on('modal.hide', function(e, target) {
					if (target.internalName == 'lokalitetModal') {
					}
				})

				$scope.__modalClose = function(success) {
					modal.hide()
		      deferred.resolve(success)
				}

	      return deferred.promise;
			}

		}

	}]);

	
