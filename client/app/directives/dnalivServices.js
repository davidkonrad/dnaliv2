'use strict';

angular.module('dnalivApp')
  .factory('Utils', ['$window', function ($window) {
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

			mergeObj: function(toObject, srcObject, overwrite) {
				srcObject = this.getObj(srcObject)
				for (var p in srcObject) {
					toObject[p] = srcObject[p]
				}
				//return toObject so it can be sued in an expression
				return toObject
			},

			//insert value into array IF the value is unique and not null
			arrayInsert: function(array, value) {
				if (value && !~array.indexOf(value)) array.push(value)
			},
			
			fixDate : function(date) {
				var d = new Date(date);
				if (!isNaN(d.getTime())) {
					return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + d.getFullYear();
				} else {
					return '' //'?'
				}
			},

			todayStr: function() {
				var d = new Date();	
				var s = d.getDate();
				s+= '-'+(d.getMonth()+1);
				s+= '-'+d.getFullYear();
				return s;
			},

			formIsEdited : function(id) {
				var form = document.querySelector(id)
				if (form) {
					var i=0, inputs = form.querySelectorAll('select,input');
					for (var i, l=inputs.length; i<l; i++) {
						if (angular.element(inputs[i]).hasClass('ng-dirty')) return true
					}
				}
				return false
			},

			formReset: function(id) {
				var form = document.querySelector(id)
				if (form) {
					var i=0, inputs = form.querySelectorAll('input');
					for (i; i<inputs.length; i++) {
						angular.element(inputs[i]).removeClass('ng-dirty')
					}
				}
			},

			dataTables_daDk: {
		    "sEmptyTable":     "Ingen resultater (prøv en anden søgning)",
		    "sInfo":           "Viser _START_ til _END_ af _TOTAL_ rækker",
		    "sInfoEmpty":      "Viser 0 til 0 af 0 rækker",
  		  "sInfoFiltered":   "(filtreret ud af _MAX_ rækker ialt)",
  		  "sInfoPostFix":    "",
  		  "sInfoThousands":  ",",
		    "sLengthMenu":     "Vis _MENU_ rækker",
		    "sLoadingRecords": "Henter data...",
		    "sProcessing":     "Processing...",
		    "sSearch":         "Filter:",
		    "sZeroRecords":    "Ingen rækker matchede filter",
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

			dtNormalizeButtons: function() {
				$('.dt-button').each(function(btn) {
					$(this).removeClass('dt-button').removeClass('buttons-collection').removeClass('buttons-colvis') 
				})
			},

			dtNormalizeLengthMenu: function() {
				var select = document.querySelector('.dataTables_length select')
				if (select) {
					select.className += 'form-control inject-control'
				}
			},

			dtNormalizeSearch: function() {
				var input = document.querySelector('.dataTables_filter input')
				if (!input) return
				input.className += 'form-control inject-control'
				input.style.padding = '5px'
				input.placeholder = 'skriv ..'

				$(input).on('click', function () {
					if (!$window.getSelection().toString()) {
						// Required for mobile Safari
						this.setSelectionRange(0, this.value.length)
					}
				})

				//reset fixedheader https://l-lin.github.io/angular-datatables/#/withFixedHeader
				var fixedHeaderEle = document.getElementsByClassName('fixedHeader');
				angular.element(fixedHeaderEle).remove();
				var fixedFooterEle = document.getElementsByClassName('fixedFooter');
				angular.element(fixedFooterEle).remove();

			},

			dtPerformSearch: function(term) {
				var input = document.querySelector('.dataTables_filter input')
				if (!input) return
				input.value = term
				$(input).trigger('keyup')
			},

			//status options map
			statusOptions: [
				{ "value": -1, "text": "Aflyst", "class": "btn-danger" }, 
				{ "value": 0, "text": "Ikke bekræftet", "class": "btn-inverse" }, 
				{ "value": 1, "text": "Bekræftet", "class": "btn-success" }
			],

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
										'sejlløb', 'nor', 'tomt', 'proffesionshøjskole'
									],
			aeWaterTypes: ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump', 'tange', 
											//doubtful matches
											'bugt', 'strandpost', 'lystbådehavn', 'sund', 'vandmølle', 'tørtVedLavvande', 'botaniskHave'
											],
			aePass: "&login=davidkonrad&password=nhmdzm",

			//kommentar_type hardcoded
			KOMMENTAR_TYPE : {
				BOOKING: 1,
				KLASSE: 2,
				PROEVE: 3,
				RESULTAT: 4,
				LOKALITET: 5
			}
	
		}
	}]);



/**
	defaults for jQuery dataTables
 **/	
$.extend( true, $.fn.dataTable.defaults, {
  "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "Alle"] ]
});

//http://stackoverflow.com/a/25886951/1407478
angular.module('dnalivApp').
	directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');

            if (digits.split('.').length > 2) {
              digits = digits.substring(0, digits.length - 1);
            }

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});
angular.module('dnalivApp')
	.directive('onlyNumbers', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});


//http://stackoverflow.com/q/14995884/1407478
angular.module('dnalivApp').
	directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);

//to be able to set dynamic ng-model for proeve_extras
//http://stackoverflow.com/a/32096328/1407478
angular.module('dnalivApp').
	directive('dynamicModel', ['$compile', '$parse', function ($compile, $parse) {
    return {
			restrict: 'A',
			terminal: true,
			priority: 100000,
			link: function (scope, elem) {
				var name = $parse(elem.attr('dynamic-model'))(scope);
				elem.removeAttr('dynamic-model');
				elem.attr('ng-model', name);
				$compile(elem)(scope);
			}
		};
}]);

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "dna-pre": function ( a ) {
      if (a == null || a == "") {
         return 0;
      }
      var date = a.split('-');
			return Date.parse(date[1] + '-' + date[0] + '-' + date[2])
    }
} );

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"dk-pre": function ( a ) {
		return a.localeCompare(a, 'dk')
	}
} );

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "locale-compare-asc": function ( a, b ) {
		return a.localeCompare(b, 'da', { sensitivity: 'accent' })
  },
  "locale-compare-desc": function ( a, b ) {
		return b.localeCompare(a, 'da', { sensitivity: 'accent' })
  }
});

//neat quote method
String.prototype.quote = function() {
	return '"' + this + '"'
}


/** 
	default google stylers 
*/
var DefaultGoogleStyles = [
	//remove unwanted transport lines, færgeruter osv	
	{
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ 
			visibility: "off" 
		}]
	},
	{
   //remove "Danmark / Denmark"
   featureType: "administrative.country",
   elementType: 'labels',
   stylers: [{
     visibility: 'off'
   }]
  }, {
   //remove points of interest
   featureType: "poi",
   elementType: 'all',
   stylers: [{
     visibility: 'off'
   }]
	}, 
];

