'use strict';

angular.module('dnalivApp')
  .factory('ProeveNr', ['$modal', '$q', '$timeout', 'Db', function($modal, $q, $timeout, Db) {

		var deferred = null,
				modal = null,
				input = null,
				current_proeve_nr = null,
				proever = null;

		function loadProever() {
			/*
			Proeve.query().$promise.then(function(p) {
				proever = p	
			})
			*/
			proever = Db.proever();
		}

		function proeveNrExists(proeve_nr) {
			if (!proever) return
			for (var i=0;i<proever.length;i++) {
				if (proever[i].proeve_nr == proeve_nr) return proever[i]
			}
			return false
		}

		return {
			
			change: function($scope, proeve_nr) {
				loadProever()
				current_proeve_nr = proeve_nr

				$scope.proeveNrModal = {
					title: 'Ret PrøveID ..',
					message: 'Skriv nyt (unikt) PrøveID :',
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
					message: 'Skriv nyt (unikt) PrøveID :',
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
			},

			/** attach resultat to ... **/
			attachTo: function($scope) {
				loadProever()

				$scope.proeveNrModal = {
					title: 'Opret nyt Resultat for Prøve ..',
					message: 'Vælg eksisterende Prøve eller opret ny :',
					canSubmit: false,
					willCreate: false,
					proeve_nr: '',
					proeve_id: null
				}

				$scope.$watchGroup(['proeveNrModal.proeve_nr', 'proeveNrModal.willCreate'], function(newVal, oldVal) {
					var $input = $('#modal-proeveNr-input'),
							$glyph = $('#modal-proeveNr-glyph'),
							$create = $('#modal-proeveNr-create');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$create.hide()
						$scope.proeveNrModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$create.show()
						$scope.proeveNrModal.canSubmit = false
					}

					if ($scope.proeveNrModal.proeve_nr == '') {
						error()
						$create.hide()
						return
					}
					if (proeveNrExists($scope.proeveNrModal.proeve_nr)) {
						ok()
					} else {
						if ($scope.proeveNrModal.willCreate) {
							ok()
							$create.show()
						} else {
							error()
						}
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/proeveNr/proeveNr.modal.html',
					backdrop: 'static',
					show: true,
					internalName: 'proeveNr'
				})

				$scope.$on('modal.show', function(e, target) {
					if (target.$options.internalName == 'proeveNr' && !modal.initialized) {
						$('#input').typeahead({
							showHintOnFocus: true,
							source: proever,
							displayText: function(item) {
								//prevent crashing if proeve_nr is null
								return item.proeve_nr != null  ? item.proeve_nr : ''
							},
							items: 10,
							afterSelect: function(item) {
								$timeout(function() {
									$scope.proeveNrModal.proeve_nr = item.proeve_nr
									$scope.proeveNrModal.proeve_id = item.proeve_id
									$scope.proeveNrModal.willCreate = false
								})
							}
						})
						$scope.proeveNrModal.proeve_nr = ''
						angular.element('#input').focus()
					}
				})

				$scope.proeveNrClose = function(success) {
					modal.hide()
					if (success) {
						var result = $scope.proeveNrModal.willCreate ? $scope.proeveNrModal.proeve_nr : $scope.proeveNrModal.proeve_id 
					} else {
						result = false
					}
		      deferred.resolve(result)
				}
	
	      return deferred.promise;

			},

			/**
				this should REALLY be trivialised 
			**/
			select: function($scope, proeve_nr) {
				loadProever();

				$scope.proeveNrModal = {
					title: 'Knyt til Prøve / PrøveID ..',
					message: 'Opslag på PrøveID :',
					canSubmit: false,
					proeve_nr:  null//proeve_nr
				}
				$scope.$watch('proeveNrModal.proeve_nr', function(newVal, oldVal) {
					var $input = $('#modal-proeveNr-input'),
							$glyph = $('#modal-proeveNr-glyph'),
							$exists = $('#modal-proeveNr-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$scope.proeveNrModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$scope.proeveNrModal.canSubmit = false
					}

					$scope.proeveNrModal.proeve = proeveNrExists(newVal)
					if ($scope.proeveNrModal.proeve) {
						ok()
					} else {
						error()
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/proeveNr/proeveNr.modal.html',
					backdrop: 'static',
					show: true,
					internalName: 'proeveNr',
					tag: 'test'
				})

				$scope.$on('modal.show', function(e, target) {
					if (target.$options.internalName == 'proeveNr' && !modal.initialized) {
						modal.initialized = true
						$('#input').typeahead({
							source: proever,
							showHintOnFocus: true,
							displayText: function(item) {
								return item.proeve_nr
							},
							items: 10,
							afterSelect: function(item) {
							}
						})
					}
				});

				$scope.proeveNrClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.proeveNrModal.proeve : false)
				}

	      return deferred.promise;
			}

		}

	}]);


