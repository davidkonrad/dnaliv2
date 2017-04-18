'use strict';

angular.module('dnalivApp')
  .factory('Db', ['$q', '$interval', 'Booking', 'Taxon', 'Lokalitet_spot', 'Proeve', 'Resultat_item', 'Resultat', 'Klasse', 'Proeve_extras', 
		function($q, $interval, Booking, Taxon, Lokalitet_spot, Proeve, Resultat_item, Resultat, Klasse, Proeve_extras) {

		var	initialized = false;
		var	bookings = null;
		var	lokalitet = null;
		var	lokalitet_spot = null;
		var	resultat_items = null;
		var	resultater = null;
		var	proever = null;
		var	klasser = null;
		var	taxons = null;
		var	extras = null;

		return {

			//reload methods
			reloadBookings: function() {
				var deferred = $q.defer();
				Booking.query().$promise.then(function(data) {	
					bookings = data;
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

			reloadResultat_items: function() {
				var deferred = $q.defer()
				Resultat_item.query().$promise.then(function(data) {	
					resultat_items = data
			    deferred.resolve(resultat_items)
				})
				return deferred.promise
			},

			reloadResultater: function() {
				var deferred = $q.defer()
				Resultat.query().$promise.then(function(data) {	
					resultater = data
			    deferred.resolve(resultater)
				})
				return deferred.promise
			},

			reloadKlasser: function() {
				var deferred = $q.defer()
				Klasse.query().$promise.then(function(data) {	
					klasser = data
			    deferred.resolve(klasser)
				})
				return deferred.promise
			},

			reloadProever: function() {
				var deferred = $q.defer()
				Proeve.query().$promise.then(function(data) {	
					proever = data
			    deferred.resolve(proever)
				})
				return deferred.promise
			},

			reloadExtras: function() {
				var deferred = $q.defer()
				Proeve_extras.query({ where : { active: true } }).$promise.then(function(data) {
					extras = data.map(function(extra) {
						extra.model = 'extra'+extra.extras_id
						return extra
					})
			    deferred.resolve(proever)
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
			klasser: function() {
				return klasser
			},
			extras: function() {
				return extras
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
				Proeve_extras.query({ where : { active: true } }).$promise.then(function(data) {
					extras = data.map(function(extra) {
						extra.model = 'extra'+extra.extras_id
						return extra
					})
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

