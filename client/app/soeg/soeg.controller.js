'use strict';

angular.module('dnalivApp')
  .controller('SoegCtrl', ['ItemsService', '$scope', '$http', '$timeout', '$modal', 'User', 'Utils', 'Alert', 'Taxon', 'Proeve', 'Booking', 
			'Resultat', 'Resultat_item', 'System_user', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function (ItemsService, $scope, $http, $timeout, $modal, User, Utils, Alert, Taxon, Proeve, Booking, 
			Resultat, Resultat_item, System_user, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

	$scope.tags = [
  { "text": "Tag1" },
  { "text": "Tag2" },
  { "text": "Tag3" },
  { "text": "Tag4" },
  { "text": "Tag5" },
  { "text": "Tag6" },
  { "text": "Tag7" },
  { "text": "Tag8" },
  { "text": "Tag9" },
  { "text": "Tag10" }
]

		$scope.arter = []

		$scope.soeg = {
		}

		Taxon.query().$promise.then(function(taxons) {
			$scope.taxonTags = taxons.map(function(taxon) {
				return { text: taxon.taxon_navn_dk }
			})
		})
			
		var proeveMap

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

		var grayIcon = L.icon({
			iconUrl: 'assets/images/Circle_Grey.png',
			iconAnchor: [0,0], 
			popupAnchor: [9,0] 
		})

		Taxon.query().$promise.then(function(taxons) {
			$scope.taxons = taxons
		})
		$scope.getTaxon = function(taxon_id) {
			for (var i=0; i<$scope.taxons.length; i++) {
				if ($scope.taxons[i].taxon_id == taxon_id) {
					return $scope.taxons[i]
				}
			}
		}

		Booking.query().$promise.then(function(bookings) {
			$scope.bookings = bookings
			$scope.loadData()
		})
		$scope.getBookingKlasse = function(booking_id) {
			//console.log('getBooking', booking_id)
			if (!$scope.bookings || booking_id == undefined) return 
			for (var i=0; i<$scope.bookings.length; i++) {
				if ($scope.bookings[i].booking_id == booking_id) {
					//console.log($scope.bookings[i])
					return $scope.bookings[i].Klasse
				}
			}
		}

		$timeout(function() {
			proeveMap = L.map('proeve-map').setView([55.685255690177826, 12.572981195446564], 7);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(proeveMap)
		})

		$scope.loadData = function() {
			Proeve.query().$promise.then(function(proever) {
				proever.forEach(function(proeve) {
					if (proeve.Resultat && proeve.Resultat.length>0
							&& proeve.Lokalitet
							&& proeve.Lokalitet.latitude != ''
							&& proeve.Lokalitet.longitude != '') {
						
						var bookingKlasse = $scope.getBookingKlasse(proeve.Resultat[0].booking_id)
						var klasser = ''
						var laerer = []
						if (proeve.Resultat[0].booking_id) bookingKlasse.forEach(function(klasse) {
							laerer.push(klasse.laererNavn)
							if (klasser != '') klasser+='<br>'
							klasser += klasse.institutionsnavn +', '+klasse.laererNavn + '&nbsp;&nbsp;&nbsp;'
						})

						var popup = ''
						popup += '<h3>'+proeve.Lokalitet.presentationString+'</h3>'
	
						popup += '<table class="visualisering-popup">'
						popup += '<tr><td>PrøveID</td><td>'+ proeve.proeve_nr +'</td></tr>'
						popup += '<tr><td>Geolok.</td><td>'+ proeve.Lokalitet.latitude + ',' + proeve.Lokalitet.longitude +'</td></tr>'
	
						if (proeve.Indsamler && !~laerer.indexOf(proeve.Indsamler)) {
							popup += '<tr><td>Indsamler</td><td>'+ proeve.Indsamler +'</td></tr>'
						}

						if (klasser != '') popup += '<tr><td>Institution</td><td>'+ klasser +'</td></tr>'
						popup += '<tr><td>Indsamlingsdato</td><td>'+ Utils.fixDate(proeve.indsamlingsdato) +'</td></tr>'
						popup += '<tr><td>Analysedato</td><td>'+ Utils.fixDate(proeve.Resultat[0].datoForAnalyse) +'</td></tr>'
						popup += '</table>'
						popup += '<br>'
						popup += '<table>'
						//
						Resultat_item.query({ where: { resultat_id: proeve.Resultat[0].resultat_id }}).$promise.then(function(resultat_items) {	
							var processedTaxons = [], found = [], notFound = [];
							resultat_items.forEach(function(item) {
								if (item.eDNA && item.database_result) {
									if (found.indexOf(item.taxon_id) == -1) {
										found.push(item.taxon_id)
										var taxon  = $scope.getTaxon(item.taxon_id)
										popup += '<tr><td><i class="fa fa-check green">&nbsp;</td><td>'+taxon.taxon_navn_dk+' <em style="color:gray;">'+taxon.taxon_navn+'</em></td></tr>'
									}
								}
							})	

							popup += '</table>'
							popup += '<br>'

							var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)],
								{ icon: redIcon }
							).addTo(proeveMap)
						   .bindPopup(popup)

						})
					} else if (proeve.Lokalitet	&& parseFloat(proeve.Lokalitet.latitude)>0 && parseFloat(proeve.Lokalitet.longitude)>0) {

						var popup = ''
						popup += '<h3>'+proeve.Lokalitet.presentationString+'</h3>'

						popup += '<table class="visualisering-popup">'
						popup += '<tr><td>PrøveID</td><td>'+ proeve.proeve_nr +'</td></tr>'
						popup += '<tr><td>Geolok.</td><td>'+ proeve.Lokalitet.latitude+',' + proeve.Lokalitet.longitude +'</td></tr>'
						popup += '<tr><td>Indsamler</td><td>'+ proeve.Indsamler +'</td></tr>'
						popup += '<tr><td>Indsamlingsdato</td><td>'+ Utils.fixDate(proeve.indsamlingsdato) +'</td></tr>'
						popup += '</table>'
						popup += '<br>'
	
						var marker = new L.marker(
								[parseFloat(proeve.Lokalitet.latitude), parseFloat(proeve.Lokalitet.longitude)]
								//{ icon: grayIcon }
							).addTo(proeveMap)
						   .bindPopup(popup)
					}					
				})
			})
		}

	
}]);

