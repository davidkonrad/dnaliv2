'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', 'TicketService', 'Lokalitet', 'Proeve', 'Utils', 'Booking', 'Resultat_item', 'Resultat', 'Taxon', 'Lokalitet_spot',
						'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function($scope, $compile, TicketService, Lokalitet, Proeve, Utils, Booking, Resultat_item, Resultat, Taxon, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		var redIcon = {
					iconUrl: 'assets/images/Circle_Red.png',
					iconAnchor: [0,0], 
					popupAnchor: [9,5] 
				},
				redIcon = {
					iconUrl: 'assets/images/Circle_Yellow.png',
					iconAnchor: [0,0], 
					popupAnchor: [9,5] 
				},
				greenIcon = {
					iconUrl: 'assets/images/Circle_Green.png',
					iconAnchor: [0,0], 
					popupAnchor: [9,0] 
				}

		$scope.getTaxon = function(taxon_id) {
			for (var i=0; i<$scope.taxons.length; i++) {
				if ($scope.taxons[i].taxon_id == taxon_id) {
					return $scope.taxons[i]
				}
			}
		}

		Taxon.query().$promise.then(function(taxons) {
			$scope.taxons = taxons

			Resultat_item.query().$promise.then(function(resultat_items) {
				$scope.replikatCount = resultat_items.length

				var replikater = [] 
				function processReplikat(item) {
					for (var i=0; i<replikater.length; i++) {
						if (replikater[i].taxon_id == item.taxon_id) {
							replikater[i].count++
							if (item.eDNA && item.database_result) replikater[i].found++
							return true
						}
					}
					var taxon = $scope.getTaxon(item.taxon_id)
					console.log(item.eDNA)
					replikater.push({
						count: 1,
						found: item.eDNA && item.database_result ? 1 : 0,
						taxon_id: item.taxon_id,
						taxon_navn: taxon.taxon_navn,
						taxon_navn_dk : taxon.taxon_navn_dk,
						taxon_prioritet: taxon.taxon_prioritet
					})
				}				

				resultat_items.forEach(function(item) {
					processReplikat(item)
				})

				$scope.replikater = replikater
			})
		})

		Resultat.query().$promise.then(function(resultater) {
			$scope.resultatCount = resultater.length
		})

		Booking.query().$promise.then(function(bookings) {
			$scope.bookingCount = bookings.length
		})

		Proeve.query().$promise.then(function(proever) {
			$scope.proeveCount = proever.length
		})

		Lokalitet.query().$promise.then(function(lokaliteter) {
			$scope.markers = []
			lokaliteter.forEach(function(lokalitet) {
				var lat = parseFloat(lokalitet.latitude),
						lng = parseFloat(lokalitet.longitude)

				if (lat && lng) {
					$scope.markers.push({ 
						lat: lat, 
						lng: lng,
            message: lokalitet.presentationString,
						icon: greenIcon
 					})
				}
			})
		})

		$scope.mapClick = function() {
			//console.log(arguments)
		}

		$scope.$on('leafletDirectiveMap.click', function(e, arg){
			//console.log(arg.leafletEvent.latlng)
    });

		angular.extend($scope, {
			events: {
				map: {
					enable: ['zoomstart', 'drag', 'click', 'dblclick', 'mouseover'],
					logic: 'emit'
				}
			},
		})

		$scope.center = {
			lat: 56.126627523318206,
			lng: 11.457741782069204,
			zoom: 7
		}

		$scope.$on('leafletDirectiveMarker.click', function(e, marker) {
			$scope.center = { lat: marker.model.lat, lng: marker.model.lng, zoom: 14 }			
			marker.leafletObject.openPopup()
		})

		$scope.$on('leafletDirectiveMarker.mouseover', function(e, marker) {
			marker.leafletObject.openPopup()
		})

		angular.extend($scope, {
			defaults: {
				tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
				maxZoom: 17,
				path: {
					weight: 1,
					color: '#800000',
					opacity: 1
				}
			}
		})

		angular.extend($scope, {
			layers: {
        baselayers: {
					xyz: {
						name: 'OpenStreetMap (XYZ)',
						url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
						type: 'xyz'
					},
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
				}
			}
		})

		$scope.test = function() {
			LokalitetModal.show($scope, 8)
		}


/*
					HERE_hybridDay: {
						name: 'xxx',
						url: 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}',
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
					}
*/

  }]);
