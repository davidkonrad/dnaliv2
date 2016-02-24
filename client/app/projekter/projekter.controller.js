'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', 'Auth', 'Projekt', function ($scope, $http, Auth, Projekt) {

		Projekt.query().$promise.then(function(projekter) {	
				$scope.projekter = projekter;

				$scope.dropdown = [
					{ text: "Opret nyt projekt",
						click: "createProject()",
						active: true
					}, {
						divider: true
				}]

				projekter.forEach(function(projekt) {
					$scope.dropdown.push({ text: projekt.projekt_kode, href: '#' })
				})

		})

		$scope.createProject = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_kode: kode })
		}

  }]);
