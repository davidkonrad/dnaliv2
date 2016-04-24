'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', '$modal', '$timeout', 'Auth', 'Utils', 'Geo', 'Proeve', 'Lokalitet', 'Kommentar', 'KommentarModal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 
	function ($scope, $modal, $timeout, Auth, Utils, Geo, Proeve, Lokalitet, Kommentar, KommentarModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


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
						proeve.indsamlingsdato_fixed = Utils.fixDate(proeve.indsamlingsdato)
						proeve.DatoForEkst_fixed = Utils.fixDate(proeve.DatoForEkst)
						proeve.ProeverModtaget_fixed = Utils.fixDate(proeve.ProeverModtaget)

						proeve.lokalitet = getLokalitet(proeve.lokalitet_id)

						return Utils.getObj(proeve)
					})
				})				
			})
		}
		$scope.loadData()

		$scope.loadKommentarer = function(proeve_id) {
			Kommentar.query( { where: { relation_id: proeve_id, type_id: Utils.KOMMENTAR_TYPE.PROEVE }} ).$promise.then(function(kommentarer) {	
				$scope.proeve.kommentarer = kommentarer
			})
		}

		$scope.setProeve = function(proeve_id) {
			$scope.proever.forEach(function(proeve) {
				if (proeve.proeve_id == proeve_id) {
					$scope.proeve = proeve
					$scope.loadKommentarer(proeve_id)
				}
			})			
		}

		$scope.createProeve = function() {
			var proeve_nr = prompt('PrøveNr: ', '');
			if (proeve_nr != '') Proeve.save({ proeve_id: '' }, { proeve_nr: proeve_nr }).$promise.then(function(proeve) {	
				$scope.newProeveNr = proeve_nr
				$scope.loadData()
				$timeout(function() {
					$scope.showProeve(proeve.proeve_id)
				}, 200)
			})
		}

		$scope.saveProeve = function() {
			Proeve.update({ proeve_id: $scope.proeve.proeve_id }, $scope.proeve).$promise.then(function(proeve) {	
				Utils.formReset('#proeve-form')
				$scope.loadData()
			})
		}

		$scope.proeveIsEdited = function() {
			return Utils.formIsEdited('#proeve-form')
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
			/*
			.withDOM("<'row'<'col-sm-2'l><B'col-sm-7 dt-custom'><'col-sm-3'f>>" +
							 "<'row'<'col-sm-12'tr>>" +
							 "<'row'<'col-sm-5'i><'col-sm-7'p>>")
			*/
			.withDOM('lBfrtip')
			.withOption('autoWidth', false)
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				//remove any previous set global filters
				$.fn.dataTable.ext.search = []
				$('.dt-button').each(function(btn) {
					$(this).removeClass('dt-button').removeClass('buttons-collection').removeClass('buttons-colvis') //, 'buttons-columnVisibility'])
				})
			})
			.withButtons([ 
					{ extend : 'colvis',
						text: 'Vis kolonner &nbsp;<i class="fa fa-sort-down" style="position:relative;top:-3px;"></i>',
						className: 'btn btn-default btn-xs colvis-btn'
					},
					{ text: 'Opret ny prøve',
						className: 'btn btn-primary btn-xs colvis-btn',
						action: function ( e, dt, node, config ) {
							$scope.createProeve()
            }
					}

				])
			.withLanguage(Utils.dataTables_daDk)
			//.withBootstrap()

		$scope.proeveColumns = [
      DTColumnBuilder.newColumn('proeve_nr').withTitle('Prøve nr.'),
      DTColumnBuilder.newColumn('lokalitet').withTitle('Lokalitet'),
      DTColumnBuilder.newColumn('indsamlingsdato').withOption('type', 'date').withTitle('Indsamlingsdato'),
      DTColumnBuilder.newColumn('Indsamler').withTitle('Indsamler'),
      DTColumnBuilder.newColumn('KuvertAfsendt').withOption('type', 'date').withTitle('Kuverter afsendt'),
      DTColumnBuilder.newColumn('ProeverModtaget').withOption('type', 'date').withTitle('Prøver modtaget'),
      DTColumnBuilder.newColumn('DatoForEkst').withOption('type', 'date').withTitle('Dato for ekst.'),
      DTColumnBuilder.newColumn('ElueretI').withTitle('Elueret i'),
      DTColumnBuilder.newColumn('ngUl').withTitle('ng/µl'),
      DTColumnBuilder.newColumn('dataset').withTitle('dataset')
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

		/** kommentarer **/
		$scope.addKommentar = function() {
			KommentarModal.show($scope).then(function(kommentar) {	
				var kommentar = {
					kommentar: kommentar,
					type_id: Utils.KOMMENTAR_TYPE.PROEVE,
					relation_id: $scope.proeve.proeve_id,
					created_userName: Auth.getCurrentUser().name
				}
				Kommentar.save(kommentar).$promise.then(function() {	
					$scope.loadKommentarer()
				})
			})
		}	


}]);

