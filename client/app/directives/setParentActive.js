'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:activeLink
 * @description
 * # activeLink
 */
angular.module('dnaApp')
	.directive('setParentActive', ['$location', function($location) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs, controller) {
				var classActive = attrs.setParentActive || 'active',
						path = attrs.ngHref.replace('#', '');
				scope.location = $location;
				scope.$watch('location.path()', function(newPath) {
				if (path == newPath) {
					element.parent().addClass(classActive);
				} else {
					element.parent().removeClass(classActive);
				}
			});
		}
	};
}]);
