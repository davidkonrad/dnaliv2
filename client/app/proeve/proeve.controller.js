'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', '$modal', '$timeout', 'Utils', 'Geo', 'Proeve', 'Lokalitet', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
	function ($scope, $modal, $timeout, Utils, Geo, Proeve, Lokalitet, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


		$scope.loadData = function() {
			Lokalitet.query().$promise.then(function(lokaliteter) {	
				$scope.lokaliteter = lokaliteter.map(function(lokalitet) {
					return lokalitet
				})
				function getLokalitet(lokalitet_id) {
					for (var i=0;i<$scope.lokaliteter.length;i++) {
						if ($scope.lokaliteter[i].lokalitet_id == lokalitet_id) return $scope.lokaliteter[i].presentationString
					}
					return '<ikke sat>'
				}
				Proeve.query().$promise.then(function(proever) {	
					$scope.proever = proever.map(function(proeve) {
						proeve.indsamlingsdato = Utils.fixDate(proeve.indsamlingsdato)
						proeve.DatoForEkst = Utils.fixDate(proeve.DatoForEkst)
						proeve.ProeverModtaget = Utils.fixDate(proeve.ProeverModtaget)
						proeve.lokalitet = getLokalitet(proeve.lokalitet_id)
						return Utils.getObj(proeve)
					})
				})				
			})
		}
		$scope.loadData()

		$scope.setProeve = function(proeve_id) {
			$scope.proever.forEach(function(proeve) {
				if (proeve.proeve_id == proeve_id) {
					$scope.proeve = proeve
				}
			})			
		}

		$scope.showProeve = function(proeve_id) {
			$scope.setProeve(proeve_id)
			$modal({
				scope: $scope,
				templateUrl: 'app/proeve/proeve.modal.html',
				backdrop: 'static',
				show: true
			})
		}

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
      DTColumnBuilder.newColumn('lokalitet').withTitle('Lokalitet')
    ];  



		/**
			Lokalitet
		**/
		$scope.lokalitet = {}
		$scope.map = false
		$scope.wkt = new Wkt.Wkt()

		$scope.setLokalitet = function(lokalitet_id) {
			$scope.lokaliteter.forEach(function(lokalitet) {
				if (lokalitet.lokalitet_id == lokalitet_id) {
					$scope.lokalitet = lokalitet
				}
			})
		}

		$scope.showLokalitet = function(lokalitet_id) {
			$scope.setLokalitet(lokalitet_id)
			$modal({
				scope: $scope,
				templateUrl: 'app/proeve/lokalitet.modal.html',
				backdrop: 'static',
				show: true
			})
			$timeout(function() {
				initWetland($scope, Utils, Geo)
				initializeMap($scope, Utils, Geo)
			}, 250)
		}
	
		$scope.saveLokalitet = function() {
			if ($scope.lokalitetLoaded()) {
				Lokalitet.update( { lokalitet_id: $scope.lokalitet.lokalitet_id }, $scope.lokalitet)
			} else {
				Lokalitet.save( { lokalitet_id: '' }, $scope.lokalitet).$promise.then(function(lokalitet) {	
					$scope.proeve.lokalitet_id = lokalitet.lokalitet_id
					$scope.proeve.lokalitet = lokalitet.presentationString
					Proeve.update({ proeve_id: $scope.proeve.proeve_id }, $scope.proeve)
					$scope.lokalitet.locked = true
				})
			}		
		}

		$scope.lokalitetLoaded = function() {
			return typeof $scope.lokalitet.lokalitet_id == 'number'
		}

	


}]);

