'use strict';

function initializeMap($scope, Utils) {

	var crs = new L.Proj.CRS.TMS('EPSG:25832',
    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
      resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1]
	});

	$scope.map = new L.Map('map', { crs: crs });

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
	})

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
	}

	L.control.layers($scope.baselayers).addTo($scope.map);
  $scope.map.addLayer(luftFoto);
	$scope.map.setView(L.latLng(55.9, 11.8), 1);
	$scope.map.setZoom(5);

	/**
		populate $scope with some event listeners and functions
	**/
	$scope.setLokalitetLatLng = function(latlng) {
		document.querySelector('#lat').value = latlng.lat
		document.querySelector('#lng').value = latlng.lng
		$scope.lokalitet.latitude = latlng.lat
		$scope.lokalitet.longitude = latlng.lng
	}

  $scope.map.on('click', function(e) {
		if (!$scope.lokalitet.locked) {
			$scope.setLokalitetLatLng(e.latlng) 
			$scope.lokalitetMarker.setLatLng(e.latlng)
		}
	})

	$scope.map.on('zoomend', function(e) {
	})

	$scope.lokalitetMarker = L.marker([1,1], {
		draggable: true
	})
	.addTo($scope.map)
	.on('dragend', function(e) {
		if (!$scope.lokalitet.locked) {
			console.log(e);
			$scope.setLokalitetLatLng(e.target._latlng) 
		} else {
			$scope.lokalitetMarker.setLatLng({ 
				lat: $scope.lokalitet.latitude,
				lng: $scope.lokalitet.longitude
			})
		}
	})

	$scope.showMarker = function() {
		if ($scope.lokalitet.showMarker) {
			$scope.lokalitetMarker.setOpacity(1)
		} else {
			$scope.lokalitetMarker.setOpacity(0)
		}
	}

	$scope.centerMarker = function() {
		$scope.map.setView(L.latLng($scope.lokalitet.latitude, $scope.lokalitet.longitude), 11)
	}

	$scope.$watch('lokalitet.locked', function() {
		document.querySelector('#lokalitet_wetland').readOnly = $scope.lokalitet.locked
	})

}


function initWetland($scope, Utils, Geo) {
	$scope.wetland = {};
	$scope.$watch('wetland', function() {
		console.log('WWWW', arguments);
	}, true)

	$('#lokalitet_wetland').typeahead({
		displayText: function(item) {
			return splice(item.presentationString, item.presentationString.indexOf('(')+1, item.subtype+', ')
		},
		afterSelect: function(item) {
			Utils.mergeObj($scope.lokalitet, item);
			console.log($scope.lokalitet)
			$scope.wkt.read(item.geometryWkt);
			for (var p in $scope.wkt.components) {
				var a = $scope.wkt.components[p].map(function(xy) {
					var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
					return [latLng.lng, latLng.lat]
				})

				var poly = L.polygon(a).addTo($scope.map)
				var center = poly.getBounds().getCenter()

				$scope.setLokalitetLatLng(center) 
				$scope.lokalitetMarker.setLatLng(center)
			
				var popup = new L.popup()
					.setLatLng(center) 
			    .setContent(
						'<h4>' + item.skrivemaade_officiel + '</h4>' +
						'<p>'  + item.skrivemaade_officiel + '</p>' 
					)
			    .openOn($scope.map);
			}
			$scope.map.fitBounds(poly.getBounds(), { maxZoom: 10 } ) //.draw()??
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

