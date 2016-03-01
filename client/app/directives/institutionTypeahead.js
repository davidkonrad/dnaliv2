'use strict';

/**
 * @ngdoc directive
 * @name dnalivApp.directive:institutionTypeahead
 * @description
 * # institutionTypeahead
 */
angular.module('dnalivApp')
	.directive('institutionTypeahead', function () {
		return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			$(element).typeahead({
				afterSelect: function (item) {
					console.log('wetland selected', item);
				}, 
				items : 20,
			  source: function(query, process) {
					//TODO: run service with tickets instead of hardcoded username / password
					var login = "davidkonrad", 
							password = "nhmdzm",
							url = 'https://services.kortforsyningen.dk/Geosearch?search=*'+query+'*&resources=stednavne_v2&limit=100&login='+login+'&password='+password;

			    return $.getJSON(
			      url,
			      function(resp) {
							var newData = [],
									types = ['gymnasium', 'uddannelsescenter', 'privatskoleFriskole', 'folkeskole', 'universitet', 'specialskole']
							for (var i in resp.data) {
								//console.log(resp.data[i].type, resp.data[i].subtype);
								if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
									//console.log(resp.data[i]);
									newData.push(resp.data[i].presentationString);
								}
							}			
							return process(newData);		
				    })
				  }
				})
			}
		}
})
