'use strict';

angular.module('dnalivApp')
  .factory('ProeveNr', ['$modal', '$q', '$timeout', 'Proeve', function($modal, $q, $timeout, Proeve) {

		var deferred = null,
				modal = null,
				input = null,
				current_proeve_nr = null,
				proever = null;

		function loadProever() {
			Proeve.query().$promise.then(function(p) {
				proever = p	
			})
		}

		function proeveNrExists(proeve_nr) {
			for (var i=0;i<proever.length;i++) {
				if (proever[i].proeve_nr == proeve_nr) return true
			}
			return false
		}

		return {
			
			change: function($scope, proeve_nr) {
				loadProever()
				current_proeve_nr = proeve_nr

				$scope.proeveNrModal = {
					title: 'Ret prøveNr ..',
					message: 'Skriv nyt (unikt) prøveNr :',
					canSubmit: false,
					proeve_nr: proeve_nr
				}

				$scope.$watch('proeveNrModal.proeve_nr', function(newVal, oldVal) {
					//what the heck, why not use jQuery since it is loaded anyway
					var $input = $('#modal-proeveNr-input'),
							$glyph = $('#modal-proeveNr-glyph'),
							$exists = $('#modal-proeveNr-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$exists.hide()
						$scope.proeveNrModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$exists.show()
						$scope.proeveNrModal.canSubmit = false
					}

					if (newVal != oldVal) {
						if (proeveNrExists(newVal)) {
							if (newVal != current_proeve_nr) {
								error()
							} else {
								ok()
								//disallow submit id unchanged
								$scope.proeveNrModal.canSubmit = false
							}
						} else {
							ok()
						}
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/proeveNr/proeveNr.modal.html',
					backdrop: 'static',
					show: true
				})

				$scope.proeveNrClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.proeveNrModal.proeve_nr : false)
				}

	      return deferred.promise;
			},

			/**
				this should REALLY be trivialised 
			**/
			create: function($scope) {
				loadProever()

				$scope.proeveNrModal = {
					title: 'Opret ny prøve ..',
					message: 'Skriv nyt (unikt) prøveNr :',
					canSubmit: false,
					proeve_nr: null
				}

				$scope.$watch('proeveNrModal.proeve_nr', function(newVal, oldVal) {
					var $input = $('#modal-proeveNr-input'),
							$glyph = $('#modal-proeveNr-glyph'),
							$exists = $('#modal-proeveNr-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$exists.hide()
						$scope.proeveNrModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$exists.show()
						$scope.proeveNrModal.canSubmit = false
					}

					if (newVal != oldVal) {
						if (newVal == '') {
							error()
							$exists.hide()
							return
						}
						if (proeveNrExists(newVal)) {
							error()
						} else {
							ok()
						}
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/proeveNr/proeveNr.modal.html',
					backdrop: 'static',
					show: true
				})

				modal.$promise.then(modal.show).then(function() {
					$timeout(function() {
						$scope.proeveNrModal.proeve_nr = ''
						angular.element('#input').focus()
					}, 100)
				})

				$scope.proeveNrClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.proeveNrModal.proeve_nr : false)
				}

	      return deferred.promise;
			}
		}

	}]);


