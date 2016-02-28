'use strict';

angular.module('dnalivApp')
  .controller('AdminCtrl', ['$scope', '$http', 'Taxon', function ($scope, $http, Taxon) {

		$scope.reloadTaxons = function() {
			Taxon.query().$promise.then(function(taxons) {	
				$scope.taxons = {};
				taxons.forEach(function(taxon) {
					if (!$scope.taxons[taxon.taxon_artsgruppe]) $scope.taxons[taxon.taxon_artsgruppe] = [];
					$scope.taxons[taxon.taxon_artsgruppe].push({ taxon_navn: taxon.taxon_navn, taxon_navn_dk: taxon.taxon_navn_dk });
				})
			})
		}
		$scope.reloadTaxons();

		$scope.artInfo = {};
		$scope.taxon = { Videnskabeligt_navn : '' };

		$scope.loadArtInfo = function() {
			$.get('http://allearter-databasen.dk/api/?get=art&query='+$scope.taxon.Videnskabeligt_navn, function(art) {
				console.log(art);
				$scope.artInfo = art.allearter[0];
				console.log($scope.artInfo);
			})
		}

		$scope.$watch('taxon', function(a, b) {
			if (a.Videnskabeligt_navn != b.Videnskabeligt_navn) {
				$scope.loadArtInfo()
			}
		}, true)

		$scope.taxonCreate = function() {
			Taxon.save({ taxon_id: '' }, {
				taxon_navn: $scope.artInfo.Videnskabeligt_navn,
				taxon_navn_dk: $scope.artInfo.Dansk_navn,
				taxon_artsgruppe: $scope.artInfo.Artsgruppe_dk,
				taxon_basisliste: 1
			}).$promise.then(function(taxon) {	
				$scope.reloadTaxons();
			})
		}
		

}]);

