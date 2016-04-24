'use strict';

angular.module('dnalivApp')
  .factory('KommentarModal', ['$modal', '$q', '$timeout', function($modal, $q, $timeout) {

		var deferred = null,
				kommentar = null,
				modal = null;

		return {
			show: function($scope) {
				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/kommentar/kommentar.modal.html',
					backdrop: 'static',
					show: true
				})

				modal.$promise.then(modal.show).then(function() {
					kommentar = angular.element('#kommentar')
					$timeout(function() {
						kommentar.focus()
					})
				})
		
				$scope.kommentarModalOk = function() {
					modal.hide()
		      deferred.resolve(kommentar.val())
				}

				$scope.kommentarModalCancel = function() {
					modal.hide()
				}

	      return deferred.promise;
			}
		}

	}]);


