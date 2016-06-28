'use strict';

angular.module('dnalivApp')
	.controller('NavbarCtrl', function($rootScope, $scope, $location, Auth) {

		//dirty "hack", simply return if we want the navbar to show
		//this is used in footer.html as well
		$scope.isObvious = function() {
			return $location.path() == '/obvious'
		}

		$scope.isCollapsed = true;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;
		$scope.user;

		$scope.logout = function() {
			Auth.logout();
			$location.path('/login');
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};

		$scope.getCurrentUser(function(user) {
			$scope.user = user;
		});

		$scope.$watch(Auth.isLoggedIn, function(newval, oldval) {
		})


	});
