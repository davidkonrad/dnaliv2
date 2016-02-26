'use strict';

/**
 * @ngdoc directive
 * @name dnaApp.directive:datepickerPopup
 * @description
 * # datepickerPopup
 * ensures the date field in the datepicker initially has the right format, like dd/MM/yyyy
 */
angular.module('dnalivApp')
	.directive('datepickerPopup', function (){
		return {
			restrict: 'EAC',
			require: 'ngModel',
			link: function(scope, element, attr, controller) {
				//remove the default formatter from the input directive to prevent conflict
				controller.$formatters.shift();
			}
		}
})
