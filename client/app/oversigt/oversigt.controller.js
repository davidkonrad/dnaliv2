'use strict';

angular.module('dnalivApp')
  .controller('OversigtCtrl', ['$scope', '$location', 'Utils', 'Booking', 'Klasse', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',  
		function ($scope, $location, Utils, Booking, Klasse, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {
		
		Klasse.query().$promise.then(function(klasser) {	
			$scope.klasser = klasser.map(function(klasse) {
				return klasse
			})
			Booking.query().$promise.then(function(bookings) {	
				$scope.bookings = bookings.map(function(booking) {
					booking.klasser = $scope.getKlasser(booking.booking_id)
					return Utils.getObj(booking)
				})
			})
		})

		$scope.getKlasser = function(booking_id) {
			var klasser = '';
			$scope.klasser.forEach(function(klasse) {
				if (klasse.booking_id == booking_id) {
					if (klasser != '') klasser += ' · ';
					klasser += klasse.klassetrin+' '+klasse.fag+', '+klasse.institutionsnavn
				}
			})
			return klasser
		}
		
		$scope.bookingOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(50)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				document.querySelector('tbody').setAttribute('title', 'Dobbeltklik for at redigere')
			})
			.withLanguage({
		    "sEmptyTable":     "Ingen tilgængelige data (prøv en anden søgning)",
		    "sInfo":           "Viser _START_ til _END_ af _TOTAL_ rækker",
		    "sInfoEmpty":      "Viser 0 til 0 af 0 rækker",
  		  "sInfoFiltered":   "(filtreret ud af _MAX_ rækker ialt)",
  		  "sInfoPostFix":    "",
  		  "sInfoThousands":  ",",
		    "sLengthMenu":     "Vis _MENU_ rækker",
		    "sLoadingRecords": "Loading...",
		    "sProcessing":     "Processing...",
		    "sSearch":         "Søg:",
		    "sZeroRecords":    "No matching records found",
		    "oPaginate": {
	        "sFirst":    "Første",
	        "sLast":     "Sidste",
	        "sNext":     "Næste",
	        "sPrevious": "Forrige"
		    },
		    "oAria": {
	        "sSortAscending":  ": activate to sort column ascending",
	        "sSortDescending": ": activate to sort column descending"
		    }
		})

		$scope.bookingColumns = [
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('DatoForBooking').withTitle('Dato for booking'),
      DTColumnBuilder.newColumn('DatoForBesoeg').withTitle('Dato for besøg'),
      DTColumnBuilder.newColumn('klasser').withTitle('Klasser')
    ];  

		$scope.bookingColumnDefs = [
      DTColumnDefBuilder.newColumnDef([1,2]).renderWith(function(data, type, full) {
				var d = new Date(data);
				if (!isNaN(d.getTime())) {
					return ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth()+1)).slice(-2) + '/' + d.getFullYear();
				} else {
					return '-'
				}
			})
    ]

		$scope.showBooking = function(sagsNo) {
			$location.path('bookings/'+sagsNo)
		}



}]);

