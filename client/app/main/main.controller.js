'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', '$timeout', 'TicketService', 'Lokalitet', 'Proeve', 'Db', 'Utils', 'Booking', 'Resultat_item', 'Resultat', 'Taxon', 'Lokalitet_spot',
						'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'leafletMarkersHelpers',

	 function($scope, $compile, $timeout, TicketService, Lokalitet, Proeve, Db, Utils, Booking, Resultat_item, Resultat, Taxon, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, leafletMarkersHelpers) {


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

			function bookingByBookingId(booking_id) {
				var bookings = Db.bookings()
				for (var i=0, l=bookings.length; i<l; i++) {
					if (bookings[i].booking_id == booking_id) {
						return bookings[i]
					}
				}
				return null
			}

			$scope.resultat = items.filter(function(item) {
				item.Lokalitet = lokalitetByResultatId(item.resultat_id)
				item.Booking = bookingByBookingId(item.booking_id)
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

/*
		var iconRed = {
			iconUrl: 'assets/images/red.png',
			//iconSize: [25, 41],
			iconSize: [15, 26],
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
*/

		var iconBlue = {
			iconUrl: 'assets/images/blue.png',
			iconSize: [15, 26],
			iconAnchor: [12, 21], 
			shadowAnchor: [4, 62], 
			popupAnchor: [-4, -20] 
		}

		var iconRed = {
			iconUrl: 'assets/images/red.png',
			iconSize: [15, 26],
			iconAnchor: [12, 21], 
			shadowAnchor: [4, 62], 
			popupAnchor: [-4, -20] 
		}

		var iconGreen = {
			iconUrl: 'assets/images/green.png',
			iconSize: [15, 26],
			iconAnchor: [12, 21], 
			shadowAnchor: [4, 62], 
			popupAnchor: [-4, -20] 
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
			$scope.bookingCount = bookings.length;
			$scope.bookings = bookings;
		})

		Proeve.query().$promise.then(function(proever) {
			$scope.proeveCount = proever.length
		})

		Proeve.query().$promise.then(function(proever) {
			$scope.proever = proever
		})

		$scope.$on('leafletDirectiveMap.zoomend', function(event){
			//console.log('xxx', arguments)
    });

		angular.extend($scope, {
			events: {
				map: {
					enable: ['zoomstart', 'drag', 'click', 'dblclick', 'mouseover'],
					logic: 'emit'
				}
			},
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
				    type: 'google',
						layerOptions: {
							mapOptions: {
								styles: DefaultGoogleStyles
						  }
						}
				  },
				  googleHybrid: {
				    name: 'Google Hybrid',
				    layerType: 'HYBRID',
				    type: 'google',
						layerOptions: {
							mapOptions: {
								styles: DefaultGoogleStyles
						  }
						}
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
						//type: 'group',
						layerOptions: {
							maxClusterRadius: function(zoom) { 
				        //return (zoom > 10) ? 80 : 1; // radius in pixels
								return 0.01;
							}
						},
						visible: true
					},
					proever: {
          	name: 'Samtlige prøver',
						type: 'markercluster',
						//type: 'group',
						layerOptions: {
							maxClusterRadius: function(zoom) { 
								return -1; 
							}
						},
						visible: false
					}
				}
			}
		})

		$scope.taxonClick = function(taxon) {
	    leafletMarkersHelpers.resetMarkerGroups();
			$scope.currentTaxonId = taxon.taxon_id;
			$scope.markers = []	

			$scope.center = {
				lat: 56.126627523318206,
				lng: 11.457741782069204,
				zoom: 7
			}

			function resultatByResultatId(resultat_id) {
				for (var i=0, l=$scope.resultat.length; i<l; i++) {
					if ($scope.resultat[i].resultat_id == resultat_id) {
						return $scope.resultat[i]
					}
				}
				return null
			}

			function getProeveNr(proeve_id) {
				for (var i=0, l=$scope.proever.length; i<l; i++) {
					if ($scope.proever[i].proeve_id == proeve_id) {
						return $scope.proever[i].proeve_nr
					}
				}
				return 'Prøve ID ikke sat'
			}

			function getInstitution(booking) {
				var s = '';
				for (var i=0, l=booking.Klasse.length; i<l; i++) {
					if (s != '') s+= ', ';
					s += booking.Klasse[i].institutionsnavn;
				}
				return s;
			}

			function getIndsamlingsInstitution(proeve_id) {
				for (var i=0, l=$scope.proever.length; i<l; i++) {
					if ($scope.proever[i].proeve_id == proeve_id) {
						return $scope.proever[i].indsamlerInstitution
					}
				}
				return 'Ikke sat'
			}

			function getIndsamlingsDato(proeve_id) {
				for (var i=0, l=$scope.proever.length; i<l; i++) {
					if ($scope.proever[i].proeve_id == proeve_id) {
						return $scope.proever[i].indsamlingsDato
					}
				}
				return 'Ikke sat'
			}

			$timeout(function() {
				$scope.resultat_items.forEach(function(item) {
					if (item.taxon_id == taxon.taxon_id) {
						var resultat = resultatByResultatId(item.resultat_id)

						if (resultat && resultat.Lokalitet) {
							var trusty = item.negativ == false && item.positiv == true
							var icon = trusty && item.eDNA ? iconGreen : iconRed
							var message = '<b>' + resultat.Lokalitet.presentationString + '</b><br>';
							//console.log(resultat);
							message += getProeveNr(resultat.proeve_id) + '<br><br>';
							message += 'Dato for indsamling: ' + Utils.fixDate(getIndsamlingsDato(resultat.proeve_id)) + '<br>';
							message += 'Indsamlet af: ' + getIndsamlingsInstitution(resultat.proeve_id) + '<br>';
							message += 'Dato for Analyse: '+Utils.fixDate(resultat.datoForAnalyse) + '<br>';
							message += 'Analyseret af : '+ getInstitution(resultat.Booking) + '<br>';

							message += getInstitution(resultat.Booking) + '<br>';

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
			})
		}

		/** **/
		$scope.proeverClick = function() {
			$scope.currentTaxonId = null;
			$scope.markers = [];	
			$scope.center = {
				lat: 56.126627523318206,
				lng: 11.457741782069204,
				zoom: 7
			};
			Proeve.query().$promise.then(function(proever) {
				proever.forEach(function(proeve) {
					if (proeve.Lokalitet && proeve.Lokalitet.latitude>0 && proeve.Lokalitet.longitude>0) {
						var message = '<b>'+proeve.Lokalitet.presentationString+'</b><br>';
						message += proeve.Lokalitet.latitude + ' ,' + proeve.Lokalitet.longitude +'<br>';
						if (proeve.indsamlingsDato) message += 'Indsamlet '+ Utils.fixDate(proeve.indsamlingsDato) +'<br>';
						if (proeve.indsamlerNavn) message += 'Af '+ proeve.indsamlerNavn +'<br>';
						if (proeve.indsamlerInstitution) message += proeve.indsamlerInstitution +'<br>';
						if (proeve.Resultat[0]) {
							message += proeve.Resultat[0].datoForAnalyse ? 'Analyseret '+Utils.fixDate(proeve.Resultat[0].datoForAnalyse) : '- Ikke analyseret';
						} else {
							message += '- Ikke analyseret';
						}

						$scope.markers.push({
							lat: parseFloat(proeve.Lokalitet.latitude),
							lng: parseFloat(proeve.Lokalitet.longitude),
							icon: iconBlue,
							message: message
						})
					}
				})
			})
		}
		$scope.proeverClick();

}]);
