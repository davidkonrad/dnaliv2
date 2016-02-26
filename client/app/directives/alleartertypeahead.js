'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:allearterTypeahead
 * @description
 * # allearterTypeahead
 */
angular.module('dnaApp')
  .directive('allearterTypeahead', function () {
    return {
      restrict: 'A',
			link: function postLink(scope, element, attrs) {
				var url='proxy.php?url=http://allearter-databasen.dk/api?get=arter&query=';
				$(element).typeahead({
					afterSelect: function (item) {
						console.log('allearter selected', item);
					}, 
					items : 20,
					/*
					source: function (query, process) {
						return $.get(artsgrupper+'&query', {}, function (data) {
							console.log(data);
							return process(data.options);
						})
					}
					*/
					source: function (query, process) {
						var url='proxy.php?url=http://allearter-databasen.dk/api/?get=arter&query='+query;
						return $.get(url, {}, function (data) {
							data=JSON.parse(data);
							var liste=[];
							for (var i=0;i<data.allearter.length;i++) {
								liste.push(data.allearter[i].Videnskabeligt_navn);
							}
							return process(liste);
						})
					}
				})
			}
		}
})
