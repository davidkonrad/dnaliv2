'use strict';

angular.module('dnalivApp')
  .controller('AdminCtrl', ['$scope', '$http', '$popover', 'Auth', 'User', function ($scope, $http, $popover, Auth, User) {

    // Use the User $resource to fetch all users
		$scope.users = User.query();

		$scope.popover = {};
		$scope.taxon = { Videnskabeligt_navn : '' };

		$scope.loadArtsInfo = function() {
			$.get('http://allearter-databasen.dk/api/?get=art&query='+$scope.taxon.Videnskabeligt_navn, function(art) {
				console.log(art);
				$scope.popover = $popover(angular.element('#new-taxon'), {title: 'My Title', content: 'My Content', trigger: 'manual'});
				$scope.popover.$promise.then($scope.popover.show);
			})
		}

		$scope.$watch('taxon', function() {
			console.log('taxon', $scope.taxon);
			$scope.loadArtsInfo()
		}, true)

		

}]);

