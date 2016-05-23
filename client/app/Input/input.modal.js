'use strict';

angular.module('dnalivApp')
  .factory('InputModal', ['$modal', '$q', '$timeout', function($modal, $q, $timeout) {

		var deferred = null,
				input = null,
				modal = null;

		return {
			show: function($scope, title, desc, value) {

				$scope.__inputModal = {
					title: title ? title : 'Input',
					desc: desc ? desc : 'Skriv tekst og klik OK',
				}

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/Input/input.modal.html',
					backdrop: 'static',
					show: true
				})

				modal.$promise.then(modal.show).then(function() {
					input = angular.element('#input')
					if (value) input.val(value)
					$timeout(function() {
						input.focus()
					}, 50)
				})
		
				$scope.inputModalOk = function() {
					modal.hide()
		      deferred.resolve(input.val())
				}

				$scope.inputModalCancel = function() {
					modal.hide()
				}

	      return deferred.promise;
			}
		}

	}]);


