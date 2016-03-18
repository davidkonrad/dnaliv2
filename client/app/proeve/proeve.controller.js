'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', 'Utils', 'Proeve', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
	function ($scope, Utils, Proeve, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		Proeve.query().$promise.then(function(proever) {	
			$scope.proever = proever.map(function(proeve) {
				proeve.indsamlingsdato = Utils.fixDate(proeve.indsamlingsdato)
				proeve.DatoForEkst = Utils.fixDate(proeve.DatoForEkst)
				proeve.ProeverModtaget = Utils.fixDate(proeve.ProeverModtaget)
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
      DTColumnBuilder.newColumn('dataset').withTitle('dataset'),
      DTColumnBuilder.newColumn('indsamlingsdato').withOption('type', 'date').withTitle('Indsamlingsdato'),
      DTColumnBuilder.newColumn('DatoForEkst').withOption('type', 'date').withTitle('Dato for ekst.'),
      DTColumnBuilder.newColumn('ProeverModtaget').withOption('type', 'date').withTitle('Prøver modtaget'),
      DTColumnBuilder.newColumn('KuvertAfsendt').withOption('type', 'date').withTitle('Kuverter afsendt'),
      DTColumnBuilder.newColumn('ElueretI').withTitle('Elueret i'),
      DTColumnBuilder.newColumn('ngUl').withTitle('ng/µl'),
      DTColumnBuilder.newColumn('Indsamler').withTitle('Indsamler'),
      DTColumnBuilder.newColumn('Lokalitet').withTitle('Lokalitet')
    ];  



}]);

