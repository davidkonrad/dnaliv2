'use strict';

angular.module('dnalivApp')
  .factory('Utils', function() {
		return {
			getObj: function($resource, prefix) {
				var exclude = ['$promise','$resolved','toJSON','$get','$save','$query','$remove','$delete','$update'],
						prop, p = {};
				for (prop in $resource) {
					if (prefix) {
						if (~prop.indexOf(prefix)) p[prop] = $resource[prop]
					} else {
						if (!~exclude.indexOf(prop)) p[prop] = $resource[prop]
					}
				}
				return p;
			},

			fixDate : function(date) {
				var d = new Date(date);
				if (!isNaN(d.getTime())) {
					return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth()+1)).slice(-2) + '/' + d.getFullYear();
				} else {
					return '-'
				}
			},

			dataTables_daDk : {
		    "sEmptyTable":     "Ingen tilgængelige data (prøv en anden søgning)",
		    "sInfo":           "Viser _START_ til _END_ af _TOTAL_ rækker",
		    "sInfoEmpty":      "Viser 0 til 0 af 0 rækker",
  		  "sInfoFiltered":   "(filtreret ud af _MAX_ rækker ialt)",
  		  "sInfoPostFix":    "",
  		  "sInfoThousands":  ",",
		    "sLengthMenu":     "Vis _MENU_ rækker",
		    "sLoadingRecords": "Loading...",
		    "sProcessing":     "Processing...",
		    "sSearch":         "Filtrer:",
		    "sZeroRecords":    "No matching records found",
		    "oPaginate": {
	        "sFirst":    "Første",
	        "sLast":     "Sidste",
	        "sNext":     "Næste",
	        "sPrevious": "Forrige"
		    },
		    "oAria": {
	        "sSortAscending":  ": activate to sort column ascending",
	        "sSortDescending": ": activate to sort column descending"
		    }
			},

			//administrative enheder
			aeNoWater : ['spredtBebyggelse', 'bydel', 'by', 'gård', 'sten', 'bro', 'hus', 'kløft', 'andenBygning', 'dal', 
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
			aeWaterTypes: ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump',
											//doubtful matches
											'bugt', 'strandpost', 'lystbådehavn', 'sund', 'vandmølle', 'tørtVedLavvande', 'botaniskHave'
											]


		}
	});
