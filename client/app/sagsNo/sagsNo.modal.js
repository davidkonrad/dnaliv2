'use strict';

angular.module('dnalivApp')
  .factory('SagsNo', ['$modal', '$q', '$timeout', 'Booking', function($modal, $q, $timeout, Booking) {

		var deferred = null,
				modal = null,
				input = null,
				current_sagsNo = null,
				bookings = null;

		function loadBookings() {
			Booking.query().$promise.then(function(p) {
				bookings = p	
			})
		}

		function sagsNoExists(sagsNo) {
			if (!bookings) return
			for (var i=0;i<bookings.length;i++) {
				if (bookings[i].sagsNo == sagsNo) return bookings[i]
			}
			return false
		}

		return {

			change: function($scope, sagsNo) {
				loadBookings()
				current_sagsNo = sagsNo

				$scope.sagsNoModal = {
					title: 'Ret sagsNr ..',
					message: 'Skriv nyt (unikt) sagsNrr :',
					canSubmit: false,
					sagsNo: sagsNo
				}

				$scope.$on('modal.show', function(e, target) {
					//console.log('ok')
					$timeout(function() {
						$scope.sagsNoModal.sagsNo = sagsNo
						angular.element('#modal-sagsNo-input').focus()
					})
				})

				$scope.$watch('sagsNoModal.sagsNo', function(newVal, oldVal) {
					//what the heck, why not use jQuery since it is loaded anyway
					var $input = $('#modal-sagsNo-input'),
							$glyph = $('#modal-sagsNo-glyph'),
							$exists = $('#modal-sagsNo-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$exists.hide()
						$scope.sagsNoModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$exists.show()
						$scope.sagsNoModal.canSubmit = false
					}

					if (newVal.trim() == '') {
						error()
					} else {
						if (newVal != oldVal) {
							if (sagsNoExists(newVal)) {
								if (newVal != current_sagsNo) {
									error()
								} else {
									ok()
									//disallow submit id unchanged
									$scope.sagsNoModal.canSubmit = false
								}
							} else {
								ok()
							}
						}
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/sagsNo/sagsNo.modal.html',
					backdrop: 'static',
					show: true
				})

				$scope.sagsNoClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.sagsNoModal.sagsNo : false)
				}

	      return deferred.promise;
			},

			/**
				this should REALLY be trivialised 
			**/
			create: function($scope) {
				loadBookings()

				$scope.sagsNoModal = {
					title: 'Opret ny Booking ..',
					message: 'Skriv nyt (unikt) sagsNr :',
					canSubmit: false,
					sagsNo: null
				}

				$scope.$watch('sagsNoModal.sagsNo', function(newVal, oldVal) {
					var $input = $('#modal-sagsNo-input'),
							$glyph = $('#modal-sagsNo-glyph'),
							$exists = $('#modal-sagsNo-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$exists.hide()
						$scope.sagsNoModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$exists.show()
						$scope.sagsNoModal.canSubmit = false
					}

					if (newVal != oldVal) {
						if (newVal == '') {
							error()
							$exists.hide()
							return
						}
						if (sagsNoExists(newVal)) {
							error()
						} else {
							ok()
						}
					}
				}) 

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/sagsNo/sagsNo.modal.html',
					backdrop: 'static',
					show: true
				})

				modal.$promise.then(modal.show).then(function() {
					$timeout(function() {
						$scope.sagsNoModal.sagsNo = 'F16-'
						angular.element('#input').focus()
					}, 100)
				})

				$scope.sagsNoClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.sagsNoModal.sagsNo : false)
				}

	      return deferred.promise;
			},

			/**
				this should REALLY be trivialised 
			**/
			select: function($scope) {
				$timeout(function() {
					loadBookings()
				})

				$scope.sagsNoModal = {
					title: 'Knyt til Booking / SagsNr',
					message: 'SagsNr :',
					canSubmit: false,
					sagsNo: null
				}

				deferred = $q.defer()
				modal = $modal({
					scope: $scope,
					templateUrl: 'app/sagsNo/sagsNo.modal.html',
					backdrop: 'static',
					show: true
				})

				modal.$promise.then(modal.show).then(function() {
					$timeout(function() {
						$('#input').typeahead({
							showHintOnFocus: true,
							source: bookings,
							displayText: function(item) {
								return item.sagsNo
							},
							items: 10,
							afterSelect: function(item) {
							}
						})
					}, 200)
				})

				$scope.$watch('sagsNoModal.sagsNo', function(newVal, oldVal) {
					var $input = $('#modal-sagsNo-input'),
							$glyph = $('#modal-sagsNo-glyph'),
							$exists = $('#modal-sagsNo-exists');

					function ok() {
						$input.removeClass('has-error').addClass('has-success')
		        $glyph.removeClass('glyphicon-remove').addClass('glyphicon-ok');         
						$scope.sagsNoModal.canSubmit = true
					}
					function error() {
						$input.removeClass('has-success').addClass('has-error')
		        $glyph.removeClass('glyphicon-ok').addClass('glyphicon-remove');         
						$scope.sagsNoModal.canSubmit = false
					}

					$scope.sagsNoModal.booking = sagsNoExists(newVal)
					if ($scope.sagsNoModal.booking) {
						ok()
					} else {
						error()
					}
				}) 

				$scope.sagsNoClose = function(success) {
					modal.hide()
		      deferred.resolve(success ? $scope.sagsNoModal.booking : false)
				}

	      return deferred.promise;
			}

		}

	}]);


