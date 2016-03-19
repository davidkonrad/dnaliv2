'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', 'Geo', function ($scope, Geo) {

		var latLng = Geo.EPSG25832_to_WGS84(610198.39,6103572.47)
		console.log('aaa', latLng);

		var pass = 	'login=davidkonrad&password=nhmdzm&';
		$scope.map = false;
		$scope.initializeMap = function() {
			if ($scope.map && $scope.map._leaflet_id) { 
				$scope.map.invalidateSize();
				return
			}
			
			var crs = new L.Proj.CRS.TMS('EPSG:25832',
		    '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', [120000, 5900000, 1000000, 6500000], {
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1]
	    });

			$scope.map = new L.Map('map', { crs: crs });

			var luftFoto = new L.tileLayer('http://{s}.services.kortforsyningen.dk/orto_foraar?'+pass+'request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
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
		    "Luftfoto": luftFoto,
		    "Skærmkort": skaermKort
			};

			L.control.layers($scope.baselayers).addTo($scope.map);
		  $scope.map.addLayer(luftFoto);
			$scope.map.setView(L.latLng(55.9, 11.8), 1);
			$scope.map.setZoom(5);

		/*
		var polygon = L.polygon([
	    [-64.509, 231.08],
	    [-51.503, 0.06],
	    [-61.51, 213.047]
		]).addTo($scope.map);
		*/
		  $scope.map.on('click', function(e) {
				console.log(e);
			})
	
		}

		$scope.extractLatLng = function(geometryWkt) {
			console.log(geometryWkt);
			var latLngs = geometryWkt.match(/(\d+).(\d+)/g)	
			var latLng = Geo.EPSG25832_to_WGS84(latLngs[0], latLngs[1])
			return L.latLng(latLng.lng, latLng.lat)
		}

		$scope.wetland = {};
		$scope.$watch('wetland', function() {
			console.log('WWWW', arguments);
		}, true)

		console.log(L);

		$scope.initWetland = function() {
		$('#lokalitet').typeahead({
			displayText: function(item) {
				return splice(item.presentationString, item.presentationString.indexOf('(')+1, item.subtype+', ')
			},
			afterSelect: function(item) {
				console.log($scope.extractLatLng(item.geometryWkt), item);
				var latLng = $scope.extractLatLng(item.geometryWkt)
				//var epsg900913 = new L.Proj('EPSG:900913');
				//var epsg2232 = new L.Proj('EPSG:2232');
				
				$scope.map.setView(latLng, 10);

				$scope.wetland = item;
				var popup = L.popup()
			    //.setLatLng(L.latLng(-63.30460696647067, 231.29616513848302))
					.setLatLng(latLng)
			    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
			    .openOn($scope.map);
			}, 
			items : 20,
		  source: function(query, process) {
				//TODO: run service with tickets instead of hardcoded username / password
				var pass = "&login=davidkonrad&password=nhmdzm",
						url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&resources=stednavne_v2&limit=100'+pass;
	
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
