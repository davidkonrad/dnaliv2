'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:wtlandTypeahead
 * @description
 * # wetlandTypeahead
 */

function splice(str, pos, insert) {
	return str.substr(0, pos) + insert + str.substr(pos)
}

angular.module('dnalivApp')
	.directive('wetlandTypeahead', function () {
		return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			$(element).typeahead({
				showHintOnFocus: true,
				afterSelect: function (item) {
					console.log('XXXXX wetland selected', item);
				}, 
				items : 20,
			  source: function(query, process) {
					//TODO: run service with tickets instead of hardcoded username / password
					var login = "davidkonrad", 
							password = "nhmdzm",
							url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&resources=stednavne_v2,adresser&limit=100&login='+login+'&password='+password;

			    return $.getJSON(
			      url,
			      function(resp) {
							var data = [], 
									caption = '', 
									types = ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump']

							//console.log(resp);
							for (var i in resp.data) {
								//console.log('xxxx', resp.data[i]);
								if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
									caption = splice(resp.data[i].presentationString, 
																	 resp.data[i].presentationString.indexOf('(')+1,
																	 resp.data[i].subtype+', ');
									data.push(caption);
								} else {
									//TODO, stop checking for types
									console.log(resp.data[i].subtype);
								}
							}			
							return process(data);		
				    })
				  }
				})
			}
		}
})
