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

angular.module('dnaApp')
	.directive('wetlandTypeahead', function () {
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
							url = 'https://services.kortforsyningen.dk/Geosearch?search='+query+'*&resources=stednavne_v2&limit=100&login='+login+'&password='+password;

			    return $.getJSON(
			      url,
			      function(resp) {
							var data = [], 
									caption = '', 
									types = ['sø', 'vandløb', 'vandloeb', 'soe', 'å', 'kilde', 'hav', 'fjord', 'bæk', 'mose', 'sump', 'moseSump']
							for (var i in resp.data) {
								if (~types.indexOf(resp.data[i].type) || ~types.indexOf(resp.data[i].subtype)) {
									//console.log(resp.data[i]);
									//caption = ;
									//caption = resp.data[i].presentationString.splice(resp.data[i].presentationString.indexOf('('), resp.data[i].subtype);
									//newData.push(resp.data[i].presentationString);
									caption = splice(resp.data[i].presentationString, 
																	 resp.data[i].presentationString.indexOf('(')+1,
																	 resp.data[i].subtype+', ');
									data.push(caption);
								} else {
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
