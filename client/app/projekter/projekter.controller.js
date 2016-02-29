'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', 'Auth', 'Projekt', 'Klasse', 'Klassetrin', 'Fag', 'Taxon', 
	function ($scope, $http, Auth, Projekt, Klasse, Klassetrin, Fag, Taxon) {

		$scope.projekt = {};
		$scope.projekter = [];
		$scope.projectLoaded = function() {
			return !angular.isDefined($scope.projekt.projekt_kode)
    }

		Projekt.query().$promise.then(function(projekter) {	
			$scope.projekter = projekter.map(function(projekt) {
				return projekt
			})
			$('.projekt-typeahead').typeahead({
				source: $scope.projekter,
				displayText: function(item) {
					return item.projekt_kode
				},
				afterSelect: function(item) {
					$scope.loadProjekt(item.projekt_id)
				}
			})
		})

		$scope.createProjekt = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_id: '' }, { projekt_kode: kode }).$promise.then(function(projekt) {	
				$scope.loadProjekt(projekt.projekt_id)
			})
		}

		var getObj = function($resource, prefix) {
			var exclude = ['$promise','$resolved','toJSON','$get','$save','$query','$remove','$delete','$update'],
					prop, p = {};
			for (prop in $resource) {
				if (prefix) {
					if (~prop.indexOf(prefix)) p[prop] = $resource[prop]
				} else {
					if (~exclude.indexOf(prop)) p[prop] = $resource[prop]
				}
			}
			return p;
		}

		$scope.loadProjekt = function(projekt_id) {
			Projekt.get({ id: projekt_id }).$promise.then(function(projekt) {	
				$scope.projekt = getObj(projekt, 'projekt_')
				$scope.loadKlasser(projekt.projekt_id)
				document.querySelector('.projekt-typeahead').value = projekt.projekt_kode
			})
		}

		$scope.saveProjekt = function() {
			Projekt.update({ projekt_id: $scope.projekt.projekt_id }, $scope.projekt)
		}

		$scope.klasser = [
				{ institution: '... ' }
		]

		$scope.loadKlasser = function(projekt_id) {
			Klasse.query({ projekt_id: projekt_id }).$promise.then(function(klasser) {	
				$scope.klasser = klasser.filter(function(klasse) {
					if (klasse.projekt_id == projekt_id) return klasse
				})
			})
		}

		Klassetrin.query().$promise.then(function(klassetrin) {	
			$scope.klassetrin = [];
			klassetrin.forEach(function(klassetrin) {
				$scope.klassetrin.push(klassetrin);
			})
		})

		Fag.query().$promise.then(function(fag) {	
			$scope.fag = [];
			fag.forEach(function(fag) {
				$scope.fag.push(fag);
			})
			console.log($scope.fag);
		})

		Taxon.query().$promise.then(function(taxons) {	
			console.log('Taxon', taxons);
		})


  }]);
