'use strict';

/*
registered
https://developer.here.com/
dnaliv
App_Id WQbz8ksVFNn4Y8ibFJ5M
App_Code AV5ngGiwOzQyWmvyF1Hm1g
*/

/**
	an ugly way to isolate code from the main controller
**/


if (L.Icon.Default.imagePath == undefined) {
	L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images'
}

function geometryWktPolygon($scope, Geo, geometryWkt) {
	$scope.wkt.read(geometryWkt);
	for (var p in $scope.wkt.components) {
		var a = $scope.wkt.components[p].map(function(xy) {
			var latLng = Geo.EPSG25832_to_WGS84(xy.x, xy.y)
			return [latLng.lng, latLng.lat]
		})
	}
	return L.polygon(a, {
		fillColor: '#FFFF00',
		color: '#FFFF00'
	}).addTo($scope.map)
}

function initializeMap($scope, Utils, Geo) {

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

var HERE_hybridDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
	attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
	subdomains: '1234',
	mapID: 'newest',
	app_id: 'WQbz8ksVFNn4Y8ibFJ5M',
	app_code: 'AV5ngGiwOzQyWmvyF1Hm1g',
	base: 'aerial',
	maxZoom: 20,
	type: 'maptile',
	language: 'da', //eng
	format: 'png8',
	size: '256'
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
    "Skærmkort": skaermKort,
    "HERE_hybridDay": HERE_hybridDay
	}

	L.control.layers($scope.baselayers).addTo($scope.map);

	var center = $scope.lokalitetLoaded() 
				? L.latLng($scope.lokalitet.latitude, $scope.lokalitet.longitude) 
				: L.latLng(55.9, 11.8)

	if ($scope.lokalitetLoaded()) {
	  $scope.map.addLayer(luftFoto);
		$scope.map.setView(center, 11);
		$scope.lokalitetPolygon = geometryWktPolygon($scope, Geo, $scope.lokalitet.geometryWkt)
	} else {
	  $scope.map.addLayer(HERE_hybridDay); //skaermkort
		$scope.map.setView(center, 10);
	}

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
		console.log(e)
		if (!$scope.lokalitet.locked) {
			$scope.setLokalitetLatLng(e.latlng) 
			$scope.lokalitetMarker.setLatLng(e.latlng)
		}
	})

	$scope.map.on('zoomend', function(e) {
	})

	$scope.lokalitetMarker = L.marker(center, {
		draggable: true
	})
	.addTo($scope.map)
	.on('dragend', function(e) {
		if (!$scope.lokalitet.locked) {
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

	$scope.showPolygon = function() {
		if ($scope.lokalitet.showPolygon) {
			$scope.map.addLayer($scope.lokalitetPolygon)
		} else {
			$scope.map.removeLayer($scope.lokalitetPolygon)
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
			$scope.lokalitetPolygon = geometryWktPolygon($scope, Geo, item.geometryWkt)
			var center = $scope.lokalitetPolygon.getBounds().getCenter()
			$scope.setLokalitetLatLng(center) 
			$scope.lokalitetMarker.setLatLng(center)
			var popup = new L.popup()
				.setLatLng(center) 
		    .setContent(
					'<h4>' + item.skrivemaade_officiel + '</h4>' +
					'<p>'  + item.skrivemaade_officiel + '</p>' 
				)
		    .openOn($scope.map);

			$scope.map.fitBounds($scope.lokalitetPolygon.getBounds(), { maxZoom: 10 } )
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

