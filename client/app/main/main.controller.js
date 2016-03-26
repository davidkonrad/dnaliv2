'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', 'Geo', 'Utils', '$timeout', '$modal', function($scope, Geo, Utils, $timeout, $modal) {

		$scope.showModal = function() {
			$modal({
				title: 'My Title', 
				templateUrl: 'app/main/lokalitet.modal.html',
				backdrop: 'static',
				show: true
			})
			$timeout(function() {
				$scope.initWetland()
				$scope.initializeMap()
			}, 300)
		}

		$scope.map = false;
		$scope.initializeMap = function() {
			$scope.wkt = $scope.wkt || new Wkt.Wkt();

			var crs = new L.Proj.CRS.TMS('EPSG:25832',
		    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1]
	    });

			$scope.map = new L.Map('map', { crs: crs });
			//$scope.map = new L.Map('map');

			var luftFoto = new L.tileLayer('http://{s}.services.kortforsyningen.dk/orto_foraar?request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
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

			var skaermKort = L.tileLayer('http://{s}.services.kortforsyningen.dk/topo_skaermkort?request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}'+Utils.aePass, {
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
			}) 

			$scope.baselayers = {
		    "Luftfoto": luftFoto,
		    "Skærmkort": skaermKort
			};

			L.control.layers($scope.baselayers).addTo($scope.map);
		  $scope.map.addLayer(luftFoto);
			$scope.map.setView(L.latLng(55.9, 11.8), 1);
			$scope.map.setZoom(5);

		  $scope.map.on('click', function(e) {
				console.log(e);
			})
	
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
					console.log(item);
					$scope.wkt.read(item.geometryWkt);
					for (var p in $scope.wkt.components) {
						var a = $scope.wkt.components[p].map(function(xy) {
							var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
							return [latLng.lng, latLng.lat]
						})
						//console.log(getCentroid2(a))
						var poly = L.polygon(a).addTo($scope.map);
						var center = poly.getBounds().getCenter();
						console.log(center);
						var popup = new L.popup()
							.setLatLng(center) 
					    .setContent(
								'<h4>' + item.skrivemaade_officiel + '</h4>' +
								'<p>'  + item.skrivemaade_officiel + '</p>' 
							)
					    .openOn($scope.map);

					}

					$scope.map.setView(center, 8, {
				    reset: true
					});
				}, 
				items : 20,
			  source: function(query, process) {
					//TODO: run service with tickets instead of hardcoded username / password
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
		

  }]);
