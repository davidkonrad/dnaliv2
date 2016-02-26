'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', 'Auth', 'Projekt', 'Klasse', function ($scope, $http, Auth, Projekt, Klasse) {

		Klasse.query().$promise.then(function(klasser) {	
			console.log(klasser)
		})

		var dropdownTemplate = [
			{ 
				text: "Opret nyt projekt",
				click: "createProjekt()",
				active: true
			}, 
			{
				divider: true
			}
		] 

		$scope.dropdown = dropdownTemplate;
		$scope.projekt = {};
		$scope.projectLoaded = function() {
			return !angular.isDefined($scope.projekt.projekt_kode)
    }

		Projekt.query().$promise.then(function(projekter) {	
				$scope.projekter = projekter;
				$scope.dropdown = dropdownTemplate;
				projekter.forEach(function(projekt) {
					$scope.dropdown.push({ text: projekt.projekt_kode, click: 'loadProjekt('+projekt.projekt_id+')' })
				})
		})

		$scope.createProjekt = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_kode: kode })
		}

		var getObj = function($resource, prefix) {
			var prop, p = {};
			for (prop in $resource) {
				if (prop.indexOf(prefix) == 0) p[prop] = $resource[prop]
			}
			return p;
		}

		$scope.loadProjekt = function(projekt_id) {
			Projekt.get({ id: projekt_id }).$promise.then(function(projekt) {	
				$scope.projekt = getObj(projekt, 'projekt_')
				$scope.loadKlasser(projekt.projekt_id)
				document.querySelector('#projekt-kode').textContent = projekt.projekt_kode
			})
		}

		$scope.saveProjekt = function() {
			Projekt.update({ projekt_id: $scope.projekt.projekt_id }, $scope.projekt);
		}

		$scope.klasser = [
				{ institutions_navn: '... ' }
		]

		$scope.loadKlasser = function(projekt_id) {
			Klasse.query({ id: projekt_id }).$promise.then(function(klasser) {	
				console.log('XXX', klasser);
			})
		}



  }]);
