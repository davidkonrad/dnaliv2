'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', '$window', '$modal', '$timeout', '$q', 'Auth', 'Alert', 'Utils', 'Geo', 'Proeve', 'ProeveNr', 'Resultat', 'Resultat_item', 
			'Taxon', 'LokalitetModal', 'Lokalitet', 'Kommentar', 'KommentarModal', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 

	function ($scope, $window, $modal, $timeout, $q, Auth, Alert, Utils, Geo, Proeve, ProeveNr, Resultat, Resultat_item,
			Taxon, LokalitetModal, Lokalitet, Kommentar, KommentarModal, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		//??
		L.Icon.Default.imagePath = '../bower_components/leaflet/dist/images/';

		Taxon.query().$promise.then(function(taxons) {
			$scope.taxons = taxons
		})

		//global deferred activated in loadData, resolved in initComplete
		var loadDeferred = null;

		$scope.loadData = function() {
			loadDeferred = $q.defer() //promisfy it

			Proeve.query().$promise.then(function(proever) {	
				$scope.proever = proever.map(function(proeve) {
			
					proeve.indsamlingsdato_fixed = Utils.fixDate(proeve.indsamlingsdato)
					proeve.DatoForEkst_fixed = Utils.fixDate(proeve.DatoForEkst)
					proeve.ProeverModtaget_fixed = Utils.fixDate(proeve.ProeverModtaget)
					proeve.lokalitet = proeve.Lokalitet ? proeve.Lokalitet.presentationString : ''

					proeve.analyseDato_fixed = proeve.Resultat.map(function(resultat) {
						return Utils.fixDate(resultat.datoForAnalyse)
					}).join("\t\t")

					return Utils.getObj(proeve)
				})

				$scope.lookupDataset = []
				$scope.lookupIndsamler = []
				$scope.lookupInstitutionsnavn = []
				proever.forEach(function(proeve) {
					if (proeve.dataset != undefined && !~$scope.lookupDataset.indexOf(proeve.dataset)) $scope.lookupDataset.push(proeve.dataset)
					if (proeve.Indsamler != undefined && !~$scope.lookupIndsamler.indexOf(proeve.Indsamler)) $scope.lookupIndsamler.push(proeve.Indsamler)
					if (proeve.Institutionsnavn != undefined && !~$scope.lookupInstitutionsnavn.indexOf(proeve.Institutionsnavn)) $scope.lookupInstitutionsnavn.push(proeve.Institutionsnavn)
				})
			})
      return loadDeferred.promise
		}
		$scope.loadData().then(function() {
		})

		$scope.loadResultater = function(proeve_id) {
			$scope.proeve.resultater = []
			Resultat.query({ where : { proeve_id: proeve_id }}).$promise.then(function(resultater) {
				resultater.forEach(function(resultat) {
					var obj = Utils.getObj(resultat)
					Resultat_item.query({ where : { resultat_id: resultat.resultat_id }}).$promise.then(function(items) {
						obj.replikater = items.length
						$scope.proeve.resultater.push(obj)
					})
				})
			})	
		}

		$scope.setProeve = function(proeve_id) {
		  return $q(function(resolve, reject) {
				for (var i=0; i<$scope.proever.length; i++) {
					if ($scope.proever[i].proeve_id == proeve_id) {
						if ($scope.proever[i].locked_by && 
								$scope.proever[i].locked_by != Auth.getCurrentUser().name ) {
							Alert.show($scope, 'Prøven er låst', 'Denne prøve redigeres pt. af <strong>'+$scope.proever[i].locked_by+'</strong>.', true)
						} else {
							$scope.proeve = $scope.proever[i];
							$scope.loadKommentarer(proeve_id)
							$scope.loadResultater(proeve_id)
							resolve(true)
						}
					}
				}
			})
			//here we could raise an error
		}

		$scope.lock = function(mode) {
			var proeve = mode ? { locked_by: Auth.getCurrentUser().name } : { locked_by: null }
			Proeve.update({ id: $scope.proeve.proeve_id }, proeve)
		}

		$scope.saveProeve = function() {
			Proeve.update({ id: $scope.proeve.proeve_id }, $scope.proeve).$promise.then(function(proeve) {	
				$scope.proeve.edited = false
				$timeout(function() {
					$scope.proeveInstance.DataTable.draw()
				})
			})
		}
		$scope.$watch('proeve.indsamlingsdato', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.indsamlingsdato_fixed = Utils.fixDate($scope.proeve.indsamlingsdato)
		})
		$scope.$watch('proeve.ProeverModtaget', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.ProeverModtaget_fixed = Utils.fixDate($scope.proeve.ProeverModtaget)
		})
		$scope.$watch('proeve.DatoForEkst', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.DatoForEkst_fixed = Utils.fixDate($scope.proeve.DatoForEkst)
		})
		$scope.$watch('proeve.dataset', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.DatoForEkst_fixed = Utils.fixDate($scope.proeve.DatoForEkst)
		})
		var fields = ['proeve.Indsamler','proeve.Institutionsnavn','proeve.Mailadresse', 'proeve.ElueretI', 'proeve.ngUl', 'proeve.AntalMl']
		$scope.$watchGroup(fields, function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
		})

		/* modal events, declare only once */
		$scope.$on('modal.show', function(e, target) {
			if (target.$options.internalName == 'proeve') {
				$('#dataset').typeahead({
					source: $scope.lookupDataset,
					showHintOnFocus: true,
					afterSelect: function(value) {
						$scope.proeve.dataset = value
					}
				})
				$('#Indsamler').typeahead({
					source: $scope.lookupIndsamler,
					showHintOnFocus: true,
					afterSelect: function(value) {
						$scope.proeve.Indsamler = value
					}
				})
				$('#Institutionsnavn').typeahead({
					source: $scope.lookupInstitutionsnavn,
					showHintOnFocus: true,
					afterSelect: function(value) {
						$scope.proeve.Institutionsnavn = value
					}
				})
			}
		})
		$scope.$on('modal.hide', function(e, target){
			if (target.$options.internalName == 'proeve') {
				$scope.lock(false)
			}
		})

		$scope.showProeve = function(proeve_id) {
			$scope.setProeve(proeve_id).then(function() {
				$scope.lock(true)
				$scope.proeveModal = $modal({
					scope: $scope,
					templateUrl: 'app/proeve/proeve.modal.html',
					backdrop: 'static',
					show: true,
					internalName: 'proeve'
				})
			})
		}

		$scope.proeveOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('lBfrtip')
			.withOption('destroy', true)
			.withOption('autoWidth', false)
			.withOption('initComplete', function() {
				//remove any previous set global filters
				//console.log('initComplete')

				$.fn.dataTable.ext.search = []
				Utils.dtNormalizeLengthMenu()
				Utils.dtNormalizeButtons()
				Utils.dtNormalizeSearch()

				if (loadDeferred) {
		      loadDeferred.resolve(true)
				}

			})
			.withButtons([ 
				{ extend : 'colvis',
					text: 'Vis kolonner &nbsp;<i class="fa fa-sort-down" style="position:relative;top:-3px;"></i>',
					className: 'btn btn-default btn-xs colvis-btn'
				}, { 
					extend : 'excelHtml5',
					text: '<i class="fa fa-download" title="Download aktuelle rækker som Excel-regneark"></i>&nbsp;Excel',
					filename: 'bookings', 
					className: 'btn btn-default btn-xs ml25px'
				},{ 
					extend : 'pdfHtml5',
					text: '<i class="fa fa-download" title="Download aktuelle rækker som PDF"></i>&nbsp;PDF',
					filename: 'bookings', 
					className: 'btn btn-default btn-xs'
				}, { 
					text: 'Opret ny prøve',
					className: 'btn btn-primary btn-xs colvis-btn',
					action: function ( e, dt, node, config ) {
						$scope.createProeve()
 					}
				}
			])
			.withLanguage(Utils.dataTables_daDk)

		$scope.proeveColumns = [
      DTColumnBuilder.newColumn('proeve_nr').withTitle('Prøve nr.'),
      DTColumnBuilder.newColumn('lokalitet').withOption('class', 'td-ellipsis').withTitle('Lokalitet'),
      DTColumnBuilder.newColumn('indsamlingsdato').withOption('type', 'date').withTitle('Indsamlingsdato'),
      DTColumnBuilder.newColumn('DatoForEkst').withOption('type', 'date').withTitle('Dato for ekst.'),
      DTColumnBuilder.newColumn('analyseDato_fixed').withOption('class', 'td-wordwrap').withOption('type', 'date').withTitle('Analysedato'),
      DTColumnBuilder.newColumn('Indsamler').withOption('visible', false).withOption('class', 'td-ellipsis').withTitle('Indsamler'),
      DTColumnBuilder.newColumn('Institutionsnavn').withOption('class', 'td-ellipsis').withTitle('Institutionsnavn'),
      DTColumnBuilder.newColumn('KuvertAfsendt').withOption('visible', false).withOption('type', 'date').withTitle('Kuverter afsendt'),
      DTColumnBuilder.newColumn('ProeverModtaget').withOption('visible', false).withOption('type', 'date').withTitle('Prøver modtaget'),
      DTColumnBuilder.newColumn('ElueretI').withOption('visible', false).withTitle('Elueret i'),
      DTColumnBuilder.newColumn('ngUl').withOption('visible', false).withTitle('ng/µl'),
      DTColumnBuilder.newColumn('dataset').withTitle('Datasæt')
    ];  

		$scope.proeveInstance = {}

		/**
			Lokalitet
		**/
		$scope.lokalitet = {}
		$scope.map = false
		$scope.wkt = new Wkt.Wkt()

		$scope.setLokalitet = function(lokalitet_id) {
			console.log(lokalitet_id)
			/*
			$scope.lokaliteter.forEach(function(lokalitet) {
				if (lokalitet.lokalitet_id == lokalitet_id) {
					$scope.lokalitet = lokalitet
				}
			})
			*/
		}

		$scope.showLokalitet = function(lokalitet_id) {
			LokalitetModal.show($scope, lokalitet_id).then(function(success) {	
				console.log(success)
			})

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

		/** 
			kommentarer 
		*/
		$scope.loadKommentarer = function(proeve_id) {
			Kommentar.query( { where: { relation_id: proeve_id, type_id: Utils.KOMMENTAR_TYPE.PROEVE }} ).$promise.then(function(kommentarer) {	
				$scope.proeve.kommentarer = kommentarer
			})
		}

		$scope.addKommentar = function() {
			KommentarModal.show($scope).then(function(kommentar) {	
				var kommentar = {
					kommentar: kommentar,
					type_id: Utils.KOMMENTAR_TYPE.PROEVE,
					relation_id: $scope.proeve.proeve_id,
					created_userName: Auth.getCurrentUser().name
				}
				Kommentar.save(kommentar).$promise.then(function() {	
					$scope.loadKommentarer($scope.proeve.proeve_id)
				})
			})
		}	

		$scope.removeKommentar = function(kommentar_id) {
			Alert.show($scope,'Slet notat', 'Slet note / kommentar - er du sikker?').then(function(confirm) {
				if (confirm) {
					Kommentar.delete({ id: kommentar_id}).$promise.then(function() {	
						$scope.loadKommentarer($scope.proeve.proeve_id)
					})
				}
			})
		}

		/** prøveNr **/
		$scope.changeProeveNr = function() {
			ProeveNr.change($scope, $scope.proeve.proeve_nr).then(function(newProeveNr) {	
				if (newProeveNr) {
					$scope.proeve.proeve_nr = newProeveNr
					Proeve.update({ proeve_id: $scope.proeve.proeve_id }, $scope.proeve).$promise.then(function(proeve) {	
					})
				}
			})
		}

		$scope.createProeve = function() {
			ProeveNr.create($scope).then(function(newProeveNr) {	
				if (newProeveNr) {
					//create lokalitet
					var lokalitet = LokalitetModal.defaultLokalitet
					lokalitet.presentationString = 'Lok. for prøve '+newProeveNr
					Lokalitet.save({ lokalitet_id: '' }, lokalitet).$promise.then(function(newLokalitet) {
						var proeve = {
							proeve_nr: newProeveNr,
							lokalitet_id: newLokalitet.lokalitet_id,
							created_userName: Auth.getCurrentUser().name
						}
						//create proeve
						Proeve.save({ proeve_id: '' }, proeve ).$promise.then(function(proeve) {
							$scope.loadData().then(function() {
								$scope.showProeve(proeve.proeve_id)								
							})
						})
					})
				}
			})
		}

		$scope.proeveHasResultat = function(proeve_id) {
			for (var i=0; i<$scope.resultater.length;i++) {
				if ($scope.resultater[i].proeve_id == proeve_id) {
					return true
				}
			}
			return false
		}

		$scope.deleteProeve = function(proeve_id) {
			Alert.show($scope,'Slet Prøve?', 'Der er ingen resultater tilknyttet prøven, så sletning er sikker.').then(function(confirm) {
				if (confirm) {
					var lokalitet_id = $scope.proeve.lokalitet_id
					Proeve.delete({ id : proeve_id }).$promise.then(function() {	
						Lokalitet.delete({ id: lokalitet_id }).$promise.then(function() {	
						}) 
						$scope.loadData()
						$scope.proeveModal.hide()
						$timeout(function() {
							$scope.proeveInstance.DataTable.draw()
						})
					})
				}
			})
		}

		/**
			resultater
		*/
		$scope.showResultat = function(resultat) {
			$scope.proeveModal.hide()
			$window.location.href = '/resultater/'+resultat.resultat_id
		}

		$scope.addResultat = function() {
			var ids = []
			$scope.taxons.forEach(function(taxon) {
				if (taxon.taxon_basisliste) ids.push(taxon.taxon_id)
			}) 
			var resultat = {
				created_userName: Auth.getCurrentUser().name,
				taxon_ids: ids.join(','),
				proeve_id: $scope.proeve.proeve_id
			}
			Resultat.save({ resultat_id: ''}, resultat).$promise.then(function(resultat) {
				$scope.showResultat(resultat)
			})
		}
			



}]);

