'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', 'TicketService', 'Geo', 'Utils', 'Booking', '$timeout', '$modal', 'LokalitetModal', 'Lokalitet_spot',
						'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function($scope, $compile, TicketService, Geo, Utils, Booking, $timeout, $modal, LokalitetModal, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


		angular.extend($scope, {
			center: {
				lat: 55.685255690177826, 
				lng: 12.572981195446564,
				zoom: 7
			}
		})

		angular.extend($scope, {
			defaults: {
				tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
				maxZoom: 14,
				path: {
					weight: 1,
					color: '#800000',
					opacity: 1
				}
			}
		});

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
