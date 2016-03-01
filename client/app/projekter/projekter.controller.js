'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', '$timeout', 'Auth', 'Projekt', 'Klasse', 'Klassetrin', 'Fag', 'Taxon', 
	function ($scope, $http, $timeout, Auth, Projekt, Klasse, Klassetrin, Fag, Taxon) {

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
				showHintOnFocus: true,
				source: $scope.projekter,
				displayText: function(item) {
					return item.projekt_kode
				},
				afterSelect: function(item) {
					$scope.loadProjekt(item.projekt_id)
				}
			})
		})

	/**
	 * Create a new projekt and load it
	 */
		$scope.createProjekt = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_id: '' }, { projekt_kode: kode }).$promise.then(function(projekt) {	
				$scope.loadProjekt(projekt.projekt_id)
			})
		}

	/**
	 * Load a projekt
	 * @param {int} projekt_id - unique projekt_id of the projekt
	 */
		$scope.loadProjekt = function(projekt_id) {
			Projekt.get({ id: projekt_id }).$promise.then(function(projekt) {	
				$scope.projekt = getObj(projekt, 'projekt_')
				$scope.loadKlasser(projekt.projekt_id)
				document.querySelector('.projekt-typeahead').value = projekt.projekt_kode
			})
		}

	/**
	 * Save current projekt
	 */
		$scope.saveProjekt = function() {
			console.log($scope.projekt);
			Projekt.update({ projekt_id: $scope.projekt.projekt_id }, $scope.projekt)
		}

		$scope.klasser = [
				{ institution: '... ' }
		]

	/**
	 * Reload and filter the klasser array
	 * @param {int} projekt_id - unique projekt_id of the projekt
	 */
		$scope.loadKlasser = function(projekt_id) {
			Klasse.query({ projekt_id: projekt_id }).$promise.then(function(klasser) {	
				$scope.klasser = klasser.filter(function(klasse) {
					if (klasse.projekt_id == projekt_id) {
						klasse.edited = false
						return klasse
					}
				})
			})
		}

		$scope.$watch('klasser', function(oldValue, newValue) {
			var fields = ['adresse', 'antal_elever', 'antal_laerer', 'fag', 'institution', 'klassetrin', 
										'kommune', 'laerer_email', 'laerer_navn', 'laerer_tlf', 'postnr'];
			
			console.log(oldValue, newValue);			
		}, false)

		$scope.getKlasseObj = function(klasse_id) {
			console.log(klasse_id, $scope.klasser);
			return $scope.klasser.filter(function(klasse) {
				if (klasse.klasse_id == klasse_id) return klasse
			})[0]
		}

		$scope.klasseIsEdited = function(klasse_id) {
			var panel = document.querySelector('[data-klasse-id="'+klasse_id+'"]');
			if (panel) {
				var i=0, inputs = panel.querySelectorAll('input');
				for (i; i<inputs.length; i++) {
					if (angular.element(inputs[i]).hasClass('ng-dirty')) return true
				}
			}
		}
			
						
	/**
	 * Attach a new klasse to the current projekt
	 */
		$scope.createKlasse = function() {
			Klasse.save({ klasse_id: '' }, { projekt_id: $scope.projekt.projekt_id }).$promise.then(function(klasse) {
				$scope.loadKlasser($scope.projekt.projekt_id)
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
		})

		Taxon.query().$promise.then(function(taxons) {	
			console.log('Taxon', taxons);
		})


  }]);
