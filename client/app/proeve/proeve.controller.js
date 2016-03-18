'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', 'Utils', 'Proeve', function ($scope, Utils, Proeve) {

		Proeve.query().$promise.then(function(proever) {	
			$scope.proever = proever.map(function(proeve) {
				return Utils.getObj(proeve)
			})
		})

		$scope.proeveOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(50)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				document.querySelector('tbody').setAttribute('title', 'Dobbeltklik for at redigere')
			})
			.withLanguage(Utils.dataTables_daDk)

		$scope.proeveColumns = [
      DTColumnBuilder.newColumn('proeve_nr').withTitle('Prøve nr.'),
      DTColumnBuilder.newColumn('dataset').withTitle('dataset')
      DTColumnBuilder.newColumn('indsamlingsdato').withTitle('Indsamlingsdato'),
      DTColumnBuilder.newColumn('Indsamler').withTitle('Indsamler'),
      DTColumnBuilder.newColumn('Lokalitet').withTitle('Lokalitet')
    ];  



}]);

