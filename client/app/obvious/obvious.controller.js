'use strict';

angular.module('dnalivApp')
  .controller('ObviousCtrl', ['ItemsService', '$scope', '$http', '$timeout', '$modal', 'User', 'Utils', 'Alert', 'Taxon', 'Proeve', 'Booking', 
			'TicketService', 'Resultat', 'Resultat_item', 'System_user', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function (ItemsService, $scope, $http, $timeout, $modal, User, Utils, Alert, Taxon, Proeve, Booking, 
			TicketService, Resultat, Resultat_item, System_user, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


		/*
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
		*/
		var greenIcon = {
			iconUrl: 'assets/images/Circle_Green.png',
			iconAnchor: [0,0], 
			popupAnchor: [9,0] 
		}, redIcon = {
			iconUrl: 'assets/images/Circle_Red.png',
			iconAnchor: [0,0], 
			popupAnchor: [9,0] 
		};
	
		$scope.markers = []

		$scope.getProeve = function(resultat_id) {
			//console.log('looking for', resultat_id) 
			for (var i=0, l=$scope.proever.length; i< l; i++) {
				//return proeve if proeve.Resultat contain 
				if ($scope.proever[i].Resultat) {
					//console.log('har resultater')
					//$scope.proever[i].Resultat.forEach(function(resultat) {
					for (var r=0; r<$scope.proever[i].Resultat.length; r++) {
						if ($scope.proever[i].Resultat[r].resultat_id == resultat_id) {
							return $scope.proever[i]
						}
					}
				}					
				/*
				if ($scope.proever[i].proeve_id == proeve_id) {
					return $scope.proever[i]
				}
				*/
			}
			//in a perfect world, we should raise some kind of error here
		}

		$scope.center = {
			lat: 56.126627523318206,
			lng: 11.457741782069204,
			zoom: 6
		}

		Proeve.query().$promise.then(function(proever) {
			$scope.proever = proever
			$scope.salamandre = []

			Resultat.query().$promise.then(function(resultater) {
				$scope.resultater = resultater

				Resultat_item.query({ where: { taxon_id: 20 } }).$promise.then(function(items) {
					items.forEach(function(item) {
						//console.log(item)
						var proeve = $scope.getProeve(item.resultat_id) 
						if (proeve && proeve.Lokalitet && proeve.Lokalitet.latitude) {
							var icon = (item.eDNA == 1 && item.database_result == 1) ? greenIcon : redIcon

								$scope.markers.push({ 
									lat: parseFloat(proeve.Lokalitet.latitude), 
									lng: parseFloat(proeve.Lokalitet.longitude),
			            message: proeve.Lokalitet.presentationString,
									icon: icon
			 					})

						/*
							var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)],
								{ icon: icon }
							).addTo($scope.map)
						   //.bindPopup(popup)
						*/
						}
					})
				})
			})
		})

		$timeout(function() {
			//$scope.map = L.map('obvious-map').setView([55.685255690177826, 12.572981195446564], 6);

			/*
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo($scope.map)
			*/

			/*
			L.tileLayer('http://kortforsyningen.kms.dk/topo_skaermkort',
						{
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
							ticket: TicketService.get()
						}).addTo($scope.map)
			*/
		})

		angular.extend($scope, {
			
			layers: {
        baselayers: {
					/*
					xyz: {
						name: 'OpenStreetMap (XYZ)',
						url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
						type: 'xyz'
					},
					*/
					dk4: {
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
							ticket: TicketService.get()
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
							ticket: TicketService.get()
						}
					}
				},
	/**
xyz,mapbox,geoJSON,utfGrid,cartodbTiles,cartodbUTFGrid,cartodbInteractive,wms,wmts,wfs,group,
featureGroup,google,china,ags,dynamic,markercluster,bing,webGLHeatmap,heat,yandex,imageOverlay,custom,cartodb
*/

				overlays : {
					Stamen_TonerLabels: {
						name: 'Labels',
						url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.{ext}', 
						type: 'xyz',
            layerOptions: {
							attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
							subdomains: 'abcd',
							minZoom: 0,
							maxZoom: 20,
							ext: 'png'
						}
					}
				}
			}
		})

	
}]);

