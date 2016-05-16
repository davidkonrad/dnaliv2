'use strict';

angular.module('dnalivApp')
  .controller('MainCtrl', ['$scope', '$compile', 'Geo', 'Utils', 'Booking', '$timeout', '$modal', 'LokalitetModal', 'Lokalitet_spot',
														'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function($scope, $compile, Geo, Utils, Booking, $timeout, $modal, LokalitetModal, Lokalitet_spot,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


		$scope.test = function() {
			LokalitetModal.show($scope)
		}

  }]);
