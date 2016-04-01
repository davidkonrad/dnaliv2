'use strict';

angular.module('dnalivApp')
  .controller('ResultaterCtrl', ['$scope', '$timeout', '$modal', 'Utils', 'Resultat', 'Resultat_taxon', 'Booking', 'Proeve', 'Taxon',
																'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
	function($scope, $timeout, $modal, Utils, Resultat, Resultat_taxon, Booking, Proeve, Taxon,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


		Booking.query().$promise.then(function(bookings) {	
			$scope.sagsNo = []
			$scope.bookings = bookings
			bookings.forEach(function(booking) {
				$scope.sagsNo[booking.booking_id] = booking.sagsNo
			})
		})

		Proeve.query().$promise.then(function(proever) {	
			$scope.proeve_nr = []
			$scope.proever = proever
			proever.forEach(function(proeve) {
				$scope.proeve_nr[proeve.proeve_id] = proeve.proeve_nr
			})
		})

		$scope.taxon = Taxon.query()
		$scope.getTaxon = function(taxon_id) {
			for (var i=0;i<$scope.taxon.length; i++) {
				if ($scope.taxon[i].taxon_id == taxon_id) {
					return Utils.getObj($scope.taxon[i])
				}
			}
		}

		$scope.reloadData = function() {
			Resultat.query().$promise.then(function(resultater) {	
				$scope.resultater = resultater.map(function(resultat) {
					resultat.sagsNo = resultat.booking_id > 0 ? $scope.sagsNo[resultat.booking_id] : '<ikke sat>'
					resultat.proeve_nr = resultat.proeve_id > 0 ? $scope.proeve_nr[resultat.proeve_id] : '<ikke sat>'
					return Utils.getObj(resultat)
				})
			})
		}
		$timeout(function() {
			$scope.reloadData()
		}, 150)

		$scope.$watch('resultat', function() {
			if ($scope.resultat) $scope.resultat.isEdited = true
		}, true)

		$scope.createResultat = function() {
			document.querySelector('body').style.cursor = "hourglass"
			Resultat.save( { resultat_id: '' } ).$promise.then(function(resultat) {	
				$scope.taxon.forEach(function(taxon) {
					var resultat_taxon = {
						resultat_id: resultat.resultat_id,
						taxon_id: taxon.taxon_id
					}
					Resultat_taxon.save( { resultat_taxon_id: '' }, resultat_taxon ).$promise.then(function(resultat_taxon) {
						//console.log(resultat_taxon)
					})
				})
				$scope.reloadData()
				$("body").css("cursor", "default")
			})
		}

		$scope.setResultat = function(resultat_id) {
			$scope.resultat = {}
			$scope.resultater.forEach(function(resultat) {
				if (resultat.resultat_id == resultat_id) {
					Utils.mergeObj($scope.resultat, resultat)
				}
			})
			Resultat_taxon.query().$promise.then(function(resultat_taxons) {	
				$scope.resultat.taxon = resultat_taxons.filter(function(resultat_taxon) {
					if (resultat_taxon.resultat_id == resultat_id) {
						var taxon = $scope.getTaxon(resultat_taxon.taxon_id),
								result_taxon = Utils.getObj(resultat_taxon)
						Utils.mergeObj(resultat_taxon, taxon)
						return resultat_taxon
					}
				})
			})

			$timeout(function() {
			}, 100)

		}
			
		$scope.saveResultat = function() {
			Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat)
			$scope.resultat.taxon.forEach(function(resultat_taxon) {
				Resultat_taxon.update({ result_taxon_id: resultat_taxon.resultat_taxon_id }, resultat_taxon)
			})
			$scope.resultat.isEdited = false
		}
						
		$scope.showResultat = function(resultat_id) {
			$scope.setResultat(resultat_id)

			$scope.taxonOptions = DTOptionsBuilder.newOptions()
				.withOption('destroy', true)
				.withOption('paging', false)
				.withOption('lengthChange', false)
				.withOption('info', false)
				.withOption('searching', false)
				.withOption('autoWidth', true)
		    .withDisplayLength(50)
				.withOption('initComplete', function() {
					$('.switch').bootstrapSwitch({
						size: 'mini',
						onText: '1',
						offText: '0',
						onSwitchChange: function() {
							$scope.resultat.isEdited = true
						}
					})
				})

			$scope.taxonColumns = [
	      DTColumnBuilder.newColumn(0).withTitle('Analyseret'),
	      DTColumnBuilder.newColumn(1).withTitle('Videnskabeligt navn'),
	      DTColumnBuilder.newColumn(2).withTitle('Dansk navn'),
	      DTColumnBuilder.newColumn(3).withTitle('Artsgruppe'),
	      DTColumnBuilder.newColumn(4).withTitle('Positiv'),
	      DTColumnBuilder.newColumn(5).withTitle('Negativ'),
	      DTColumnBuilder.newColumn(6).withTitle('eDNA'),
	      DTColumnBuilder.newColumn(7).withTitle('Pålidelig')
	    ]
			$scope.taxonColumnDefs = []

			var modal = $modal({
				scope: $scope,
				templateUrl: 'app/resultater/resultat.modal.html',
				backdrop: 'static',
				show: true
			})

			modal.$promise.then(modal.show).then(function() {
				$('.booking-typeahead').typeahead({
					showHintOnFocus: true,
					source: $scope.bookings,
					displayText: function(item) {
						return item.sagsNo
					},
					items: 15,
					afterSelect: function(item) {
						$scope.resultat.booking_id = item.booking_id
					}
				})
				$('.proeve-typeahead').typeahead({
					showHintOnFocus: true,
					source: $scope.proever,
					displayText: function(item) {
						return item.proeve_nr
					},
					items: 15,
					afterSelect: function(item) {
						$scope.resultat.proeve_id = item.proeve_id
					}
				})

			})

		}

		$scope.resultaterOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				var input = document.querySelector('.dataTables_filter input')
				input.className += 'form-control inject-control'
				input.style.padding = '5px'
				input.placeholder = 'skriv ..'

				$scope.inputFilter = input

				//TODO, make the button plugin work properly in angular
				//append a create button
				var $button = $('<button></button>')
						.addClass('new-resultat btn btn-primary btn-xs')
						.text('Nyt resultat')
						.click(function() { $scope.createResultat() })
						.insertAfter('.dataTables_length')	
				
				document.querySelector('tbody').setAttribute('title', 'Dobbeltklik for at redigere')
			})
			.withLanguage(Utils.dataTables_daDk)

		$scope.resultaterColumns = [
      DTColumnBuilder.newColumn('resultat_id').withTitle('id'),
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('proeve_nr').withTitle('Prøvenr.')
    ]

		$scope.resultaterColumnDefs = []


  }]);
