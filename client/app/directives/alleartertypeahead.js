'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:allearterTypeahead
 * @description
 * # allearterTypeahead
 */
angular.module('dnalivApp')
  .directive('allearterTypeahead', function ($parse) {
    return {
      restrict: 'A',
			scope : {
				taxon : '=atTaxon'
			},
			link: function postLink(scope, element, attrs) {
				var dansk = attrs.allearterTypeahead == 'dk';
				$(element).typeahead({
					displayText: function(item) {
						return dansk ? item.Dansk_navn : item.Videnskabeligt_navn;
					},
					afterSelect: function(item) {
						scope.taxon.Videnskabeligt_navn = item.Videnskabeligt_navn;
						scope.taxon.Dansk_navn = item.Dansk_navn;
						scope.$apply()
					}, 
					items : 20,
					source: function(query, process) {
						var url='https://allearter-databasen.dk/api/?get=arter&query='+encodeURIComponent(query);
						return $.get(url, {}, function(data) {
							return process(data.allearter);
						})
					}
				})
			}
		}
})
