'use strict';

angular.module('dnalivApp')
  .factory('Db', ['$q', 'Booking', 'Taxon', function ($q, Booking, Taxon) {

		var	initialized = false,
				bookings = null,
				taxons = null;

		return {
			reloadBookings: function() {
				var deferred = $q.defer()
				Booking.query().$promise.then(function(data) {	
					bookings = data
					deferred.resolve(bookings)
				})
				return deferred.promise
			},

			reloadTaxons: function() {
				var deferred = $q.defer()
				Taxon.query().$promise.then(function(data) {	
					taxons = data
			    deferred.resolve(taxons)
				})
				return deferred.promise
			},

			bookings: function() {
				return bookings
			},

			taxons: function() {
				return taxons
			},

			init: function() {
				var deferred = $q.defer()
				if (initialized) {
					deferred.resolve(false)
				}
				Booking.query().$promise.then(function(data) {	
					bookings = data

					Taxon.query().$promise.then(function(data) {	
						taxons = data
						
						initialized = true
				    deferred.resolve(true)
					})
				})
				return deferred.promise

			}

		}

	}])

