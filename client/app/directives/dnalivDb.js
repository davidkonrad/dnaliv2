'use strict';

angular.module('dnalivApp')
  .factory('Db', ['$q', '$interval', 'Booking', 'Taxon', 'Lokalitet_spot', 'Proeve', 
		function($q, $interval, Booking, Taxon, Lokalitet_spot, Proeve) {

		var	initialized = false,
				bookings = null,
				lokalitet = null,
				lokalitet_spot = null,
				proever = null,
				taxons = null;

		return {

			//reload methods
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
			reloadLokalitetSpots: function() {
				var deferred = $q.defer()
				Lokalitet_spot.query().$promise.then(function(data) {	
					lokalitet_spot = data
			    deferred.resolve(lokalitet_spot)
				})
				return deferred.promise
			},


			//data methods
			bookings: function() {
				return bookings
			},
			taxons: function() {
				return taxons
			},
			lokalitet_spot: function(lokalitet_id) {
				if (!lokalitet_id) return lokalitet_spot
				return lokalitet_spot.filter(function(spot) {
					return spot.lokalitet_id == lokalitet_id
				})
			},
			proever: function() {
				return proever
			},
				

			//initialize
			init: function() {
				var deferred = $q.defer()
				if (initialized) {
					console.log('Db already initialized')
					deferred.resolve(false)
				}
			
				Booking.query().$promise.then(function(data) {	
					bookings = data
				})
				Taxon.query().$promise.then(function(data) {	
					taxons = data
				})
				Lokalitet_spot.query().$promise.then(function(data) {	
					lokalitet_spot = data
				})
				Proeve.query().$promise.then(function(data) {	
					proever = data
				})

				var stop = $interval(function() {
					if (bookings && taxons && lokalitet_spot && proever) {
						console.log('Db initialized first time')
						$interval.cancel(stop);
						initialized = true
						deferred.resolve(true)
					}
				})

				return deferred.promise
			}
		}

	}])

