'use strict';

angular.module('dnalivApp')
  .controller('AdminCtrl', ['$scope', '$http', 'Taxon', function ($scope, $http, Taxon) {

		$scope.dndInserted = function() {
			console.log(arguments);
			return false
    }

		$scope.dragoverCallback = function(event, index, external, type) {
			//console.log('drag', arguments);
			return true
		}

		$scope.dropCallback = function(event, index, item, external, type) {
			$scope.taxonsUnordered.forEach(function(taxon) {
				if (taxon.taxon_id == item.taxon_id) {
					taxon.taxon_prioritet = index
					Taxon.update({ taxon_id: taxon.taxon_id }, taxon).$promise.then(function(taxon) {	
						$scope.reloadTaxons()
					})
					//console.log('drop', index, taxon)
				}
			})
			//console.log('drop', event.srcElement, event.toElement, event.target );
			//console.log('drop', arguments);
			return item;
		}

		$scope.taxonOrderBy = 'taxon_prioritet';
		$scope.taxonOrders = [
			{ "value": "taxon_prioritet", "text": "Prioritet", "class": "btn-danger" }, 
			{ "value": "taxon_navn_dk", "text": "Navn", "class": "btn-inverse" }, 
			{ "value": "taxon_artsgruppe", "text": "Artsgruppe", "class": "btn-success" },
			{ "value": "!taxon_basisliste", "text": "Basisliste", "class": "btn-success" }
		]

	
		$scope.prioritetList = [1,2,3,4,5]

		$scope.reloadTaxons = function() {
			Taxon.query().$promise.then(function(taxons) {	

				/*
				$scope.taxonsUnordered = taxons.map(function(taxon) {
					return { 
						taxon_id: taxon.taxon_id,
						taxon_navn: taxon.taxon_navn, 
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_basisliste: taxon.taxon_basisliste,
						taxon_prioritet: taxon.taxon_prioritet,
						taxon_artsgruppe: taxon.taxon_artsgruppe,
						edited: false
					}
				})
				*/

				$scope.taxons = {};
				taxons.forEach(function(taxon) {
					if (!$scope.taxons[taxon.taxon_artsgruppe]) $scope.taxons[taxon.taxon_artsgruppe] = [];
					$scope.taxons[taxon.taxon_artsgruppe].push({ 
						taxon_id: taxon.taxon_id,
						taxon_navn: taxon.taxon_navn, 
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_basisliste: taxon.taxon_basisliste,
						taxon_prioritet: taxon.taxon_prioritet,
						taxon_artsgruppe: taxon.taxon_artsgruppe,
						edited: false
					})
				})

			})
		}
		$scope.reloadTaxons();

		$scope.artInfo = {};
		$scope.taxon = { Videnskabeligt_navn : '' };

		$scope.loadArtInfo = function() {
			$.get('http://allearter-databasen.dk/api/?get=art&query='+$scope.taxon.Videnskabeligt_navn, function(art) {
				$scope.artInfo = art.allearter[0];
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
		
		$scope.basislisteToggle = function(taxon) {
			Taxon.update({ taxon_id: taxon.taxon_id }, taxon);
		}

		$scope.saveTaxon = function(art) {
			Taxon.update({ taxon_id: art.taxon_id }, art)
			art.edited = false
		}


}]);

