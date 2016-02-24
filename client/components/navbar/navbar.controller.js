'use strict';

angular.module('dnalivApp')
	.controller('NavbarCtrl', function($rootScope, $scope, $location, Auth) {

		$scope.menu = [{
			'title': 'Projekter',
			'link': '/projekter'
		}, {
			'title': 'Administration',
			'link': '/'
		}];

		$scope.isCollapsed = true;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;
		$scope.user;
		$scope.logout = function() {
			$scope.collections = undefined;
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
