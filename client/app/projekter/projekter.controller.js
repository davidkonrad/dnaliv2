'use strict';

angular.module('dnalivApp')
  .controller('ProjektCtrl', ['$scope', '$http', 'Auth', 'Projekt', function ($scope, $http, Auth, Projekt) {

		var dropdownTemplate = [
					{ text: "Opret nyt projekt",
						click: "createProject()",
						active: true
					}, {
						divider: true
		}] 

		$scope.dropdown = dropdownTemplate;
		$scope.projekt = {
			projekt_kode : '',
			projekt_tid : '10',
			projekt_dato : ''
		}

		Projekt.query().$promise.then(function(projekter) {	
				$scope.projekter = projekter;

				$scope.dropdown = dropdownTemplate;

				projekter.forEach(function(projekt) {
					$scope.dropdown.push({ text: projekt.projekt_kode, href: '#' })
				})
		})

		$scope.createProject = function() {
			var kode = prompt('Projekt kode: ', '');
			if (kode != '') Projekt.save({ projekt_kode: kode })
		}

  }]);
