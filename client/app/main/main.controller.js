'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', 'TicketService', 'Lokalitet', 'Proeve', 'Db', 'Utils', 'Booking', 'Resultat_item', 'Resultat', 'Taxon', 'Lokalitet_spot',
						'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function($scope, $compile, TicketService, Lokalitet, Proeve, Db, Utils, Booking, Resultat_item, Resultat, Taxon, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		//new load of data
		Resultat_item.query().$promise.then(function(items) {
			$scope.resultat_items = items
		})
		Resultat.query().$promise.then(function(items) {
			$scope.resultat = items
		})
		Proeve.query().$promise.then(function(items) {
			console.log(items)
			$scope.proeve = items
		})


		$scope.lokalitetByResultatId = function(resultat_id) {
			for (var i=0, l=$scope.proeve.length; i<l; i++) {
				for (var ri=0, rl=$scope.proeve[i].Resultat.length; ri<rl; ri++) {
					if ($scope.proeve[i].Resultat[ri].resultat_id == resultat_id) {
						return $scope.proeve[i].Lokalitet
					}
				}
			}
			console.log('lokalitet not found', resultat_id)
		}

		/*
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
		*/
		var iconRed = {
			iconUrl: 'assets/images/red.png',
			iconSize: [25, 41],
			shadowSize: [50, 64], // size of the shadow
			iconAnchor: [12, 41],  // point of the icon which will correspond to marker's location
			shadowAnchor: [4, 62],  // the same for the shadow
			popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
		}
		var iconGreen = {
			iconUrl: 'assets/images/green.png',
			iconSize: [25, 41]
		}


		$scope.getTaxon = function(taxon_id) {
			var taxons = Db.taxons()
			for (var i=0; i<taxons.length; i++) {
				if (taxons[i].taxon_id == taxon_id) {
					return taxons[i]
				}
			}

			/*
			for (var i=0; i<$scope.taxons.length; i++) {
				if ($scope.taxons[i].taxon_id == taxon_id) {
					return $scope.taxons[i]
				}
			}
			*/
		}

	/*
		console.log(Db)
		Db.Bookings.reload().then(function(test) {
			console.log(test)
		})
*/

/*
		Taxon.query().$promise.then(function(taxons) {
			$scope.taxons = taxons
*/

		Db.init().then(function() {
			Resultat_item.query().$promise.then(function(resultat_items) {
				$scope.resultat_items = resultat_items
				$scope.replikatCount = resultat_items.length

				var replikater = [] 
				function processReplikat(item) {
					for (var i=0; i<replikater.length; i++) {
						if (replikater[i].taxon_id == item.taxon_id) {
							replikater[i].count++
			 				if (item.eDNA && item.database_result) replikater[i].found++
							if (!~replikater[i].resultat.indexOf(item.resultat_id)) replikater[i].resultat.push(item.resultat_id)
							return true
						}
					}
					var taxon = $scope.getTaxon(item.taxon_id)
					replikater.push({
						count: 1,
						found: item.eDNA && item.database_result ? 1 : 0,
						resultat: [],
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

		/*
		$scope.markers = []
		$scope.markers.push({
			lat: 55.224049986110835,
			lng: 9.99449362606125
		})
		*/

/*
	var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)],
								{ icon: redIcon }
							).addTo(proeveMap)
						   .bindPopup(popup)
latitude: "", longitude: ""
*/

		//Lokalitet.query().$promise.then(function(lokaliteter) {
		Proeve.query().$promise.then(function(proever) {
			$scope.proever = proever
			//$scope.markers = []

			//lokaliteter.forEach(function(lokalitet) {
			proever.forEach(function(lokalitet) {
				var lat = parseFloat(lokalitet.latitude),
						lng = parseFloat(lokalitet.longitude)

				/*
				if (lat && lng) {
					$scope.markers.push({ 
						lat: lat, 
						lng: lng,
            message: lokalitet.presentationString,
						icon: greenIcon
 					})
				}
				*/
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
				},
				overlays: {
					cars: {
          	name: 'Cars',
						type: 'markercluster',
						visible: true
					}
				}
			},
markers: {
                    m1: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: "I'm a moving car"
                    },
                    m2: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: "I'm a taxon marker"
                    },
                    m3: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: 'Iam a taxon marker'
                    },
                    m4: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    },
                    m5: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    },
                    m6: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    }
                }
		})

		/*
		$scope.markers = markers: {
                    m1: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: "I'm a moving car"
                    },
                    m2: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: "I'm a car"
                    },
                    m3: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars',
                        message: 'A bike!!'
                    },
                    m4: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    },
                    m5: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    },
                    m6: {
			lat: 55.224049986110835,
			lng: 9.99449362606125,

                        layer: 'cars'
                    }
                }
		*/

		$scope.test = function() {
			LokalitetModal.show($scope, 8)
		}

		$scope.taxonClick = function(taxon) {
			function lokalitetByResultatId(resultat_id) {
				for (var i=0, l=$scope.proeve.length; i<l; i++) {
					for (var ri=0, rl=$scope.proeve[i].Resultat.length; ri<rl; ri++) {
						if ($scope.proeve[i].Resultat[ri].resultat_id == resultat_id) {
							return $scope.proeve[i].Lokalitet
						}
					}
				}
				return null
			}

			$scope.currentTaxon = ' (' + taxon.taxon_navn_dk +')'
			$scope.markers = []	
			//console.log($scope.replikater[taxon.taxon_id])
			//Resultat_item.query().$promise.then(function(resultat_items) {
			$scope.resultat_items.forEach(function(item) {
				if (item.taxon_id == taxon.taxon_id) {
					var lokalitet = lokalitetByResultatId(item.resultat_id)
					var trusty = item.negativ == false && item.positiv == true
				
					var icon = trusty && item.eDNA ? iconGreen : iconRed
					console.log(item, lokalitet)
				

					if (lokalitet && lokalitet.latitude && lokalitet.longitude) {
						console.log('OK', lokalitet)
						$scope.markers.push({
							lat: parseFloat(lokalitet.latitude),
							lng: parseFloat(lokalitet.longitude),
							icon: icon
						})
					}
					
				}
			})
				

		}


  }]);
