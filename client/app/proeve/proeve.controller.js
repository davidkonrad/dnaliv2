'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', 'Utils', 'Proeve', function ($scope, Utils, Proeve) {

		Proeve.query().$promise.then(function(proever) {	
			$scope.proever = proever.map(function(proeve) {
				return Utils.getObj(proeve)
			})
		})



}]);

