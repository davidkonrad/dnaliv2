'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', '$timeout', 'TicketService', 'Lokalitet', 'Proeve', 'Db', 'Utils', 'Booking', 'Resultat_item', 'Resultat', 'Taxon', 'Lokalitet_spot',
						'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function($scope, $compile, $timeout, TicketService, Lokalitet, Proeve, Db, Utils, Booking, Resultat_item, Resultat, Taxon, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		//new load of data
		Resultat_item.query().$promise.then(function(items) {
			$scope.resultat_items = items
		})


		Resultat.query().$promise.then(function(items) {
			function lokalitetByResultatId(resultat_id) {
				var proever = Db.proever()
				for (var i=0, l=proever.length; i<l; i++) {
					for (var ri=0, rl=proever[i].Resultat.length; ri<rl; ri++) {
						if (proever[i].Resultat[ri].resultat_id == resultat_id) {
							return proever[i].Lokalitet
						}
					}
				}
				return null
			}

			$scope.resultat = items.filter(function(item) {
				item.Lokalitet = lokalitetByResultatId(item.resultat_id)
				return item
			})
		})

		/*
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
		*/

		var iconRed = {
			iconUrl: 'assets/images/red.png',
			iconSize: [25, 41],
			shadowSize: [50, 64], 
			iconAnchor: [12, 41], 
			shadowAnchor: [4, 62], 
			popupAnchor: [-2, -46] 
		}
		var iconGreen = {
			iconUrl: 'assets/images/green.png',
			iconSize: [25, 41],
			shadowSize: [50, 64], 
			iconAnchor: [12, 41], 
			shadowAnchor: [4, 62], 
			popupAnchor: [-2, -46] 
		}

		$scope.getTaxon = function(taxon_id) {
			var taxons = Db.taxons()
			for (var i=0; i<taxons.length; i++) {
				if (taxons[i].taxon_id == taxon_id) {
					return taxons[i]
				}
			}
		}

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

		//Lokalitet.query().$promise.then(function(lokaliteter) {
		Proeve.query().$promise.then(function(proever) {
			$scope.proever = proever
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

		$scope.$on('leafletDirectiveMarker.click', function(e, marker) {
			//$scope.center = { lat: marker.model.lat, lng: marker.model.lng, zoom: 14 }			
			marker.leafletObject.openPopup()
		})

		$scope.$on('leafletDirectiveMarker.mouseover', function(e, marker) {
			marker.leafletObject.openPopup()
		})

		angular.extend($scope, {
			markers: [],
			center: {
				lat: 56.126627523318206,
				lng: 11.457741782069204,
				zoom: 7
			},
			layers: {
        baselayers: {
					googleTerrain: {
				    name: 'Google Terrain',
				    layerType: 'TERRAIN',
				    type: 'google'
				  },
				  googleHybrid: {
				    name: 'Google Hybrid',
				    layerType: 'HYBRID',
				    type: 'google'
				  },
					luftfoto: {
						name: "Orto forår",
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
					indsamlingssted: {
          	name: 'Indsamlingssted',
						type: 'markercluster',
						layerOptions: {
							maxClusterRadius: function(zoom) { 
								return 50; 
							}
						},
						visible: true
					},
					proever: {
          	name: 'Samtlige prøver',
						type: 'markercluster',
						layerOptions: {
							maxClusterRadius: function(zoom) { 
								return 50; 
							}
						},
						visible: false
					}
				}
			}
		})

		$scope.taxonClick = function(taxon) {

			$scope.currentTaxonId = taxon.taxon_id
			console.log($scope.markers)

			$scope.markers = []	

			$timeout(function() {
				console.log('markers:', $scope.markers.length, $scope.markers)
			})

			$scope.center = {
				lat: 56.126627523318206,
				lng: 11.457741782069204,
				zoom: 7
			}
		
			function resultatByResultatId(resultat_id) {
				/*
				for (var i=0, l=$scope.resultat.length; i<l; i++) {
					for (var ri=0, rl=$scope.proeve[i].Resultat.length; ri<rl; ri++) {
						if ($scope.proeve[i].Resultat[ri].resultat_id == resultat_id) {
							return $scope.proeve[i].Resultat[ri]
						}
					}
				}
				*/
				for (var i=0, l=$scope.resultat.length; i<l; i++) {
					if ($scope.resultat[i].resultat_id == resultat_id) return $scope.resultat[i]
				}
				return null
			}
	
			$scope.resultat_items.forEach(function(item) {
				if (item.taxon_id == taxon.taxon_id) {
					/*
					var booking = bookingByResultatId(item.resultat_id)
					var lokalitet = lokalitetByResultatId(item.resultat_id)
					*/
					var resultat = resultatByResultatId(item.resultat_id)

					//console.log('RESULTAT', resultat)

					if (resultat && resultat.Lokalitet) {
						var trusty = item.negativ == false && item.positiv == true
				
						var icon = trusty && item.eDNA ? iconGreen : iconRed
						//console.log('not null')
				
						var message = '<b>' + resultat.Lokalitet.presentationString + '</b><br>'
						if (resultat) message += 'Dato for Analyse: '+Utils.fixDate(resultat.datoForAnalyse)

						if (resultat.Lokalitet && resultat.Lokalitet.latitude && resultat.Lokalitet.longitude) {
							$scope.markers.push({
								lat: parseFloat(resultat.Lokalitet.latitude),
								lng: parseFloat(resultat.Lokalitet.longitude),
								layer: 'indsamlingssted',
								icon: icon,
								message: message
							})
						}
					}					
				}
			})
				

		}


}]);
