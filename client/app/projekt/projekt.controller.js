'use strict';

angular.module('dnalivApp')
  .controller('ProjectCtrl', ['$scope', '$http', 'Test', function ($scope, $http, Test) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

		$scope.action = null;
		$scope.$watch('action', function() {
			console.log($scope.action);
		})

		$scope.createProject = function() {
			var id = prompt('Projekt ID: ', '');
			if (id != '') {
				alert('ok');
			}
		}

$scope.dropdown = [
  {
    "text": "Opret nyt projekt",
    "click": "createProject()",
    "active": true
  },
  {
    "divider": true
  },
  {
    "text": "<i class=\"fa fa-globe\"></i>&nbsp;Display an alert",
    "click": "$alert(\"Holy guacamole!\")"
  },
  {
    "text": "<i class=\"fa fa-external-link\"></i>&nbsp;External link",
    "href": "#",
    "target": "_self"
  },
  {
    "text": "Separated link",
    "href": "#separatedLink"
  }
];

$scope.selectedIcon = "";
$scope.selectedIcons = ["Globe","Heart"];
$scope.icons = [{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}];

  }]);
