'use strict';

angular.module('dnalivApp')
  .controller('ProeveCtrl', ['$scope', '$window', '$location', '$modal', '$timeout', '$q', 'Auth', 'Alert', 'Db', 'Utils',  'Geo', 
			'Proeve', 'Proeve_extras', 'ProeveNr', 'Resultat', 'Resultat_item', 'Taxon', 'LokalitetModal', 'Lokalitet', 'Kommentar', 'KommentarModal', 
			'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'DTDefaultOptions',

	function ($scope, $window, $location, $modal, $timeout, $q, Auth, Alert, Db, Utils, Geo, 
						Proeve, Proeve_extras, ProeveNr, Resultat, Resultat_item, Taxon, LokalitetModal, Lokalitet, Kommentar, KommentarModal, 
						DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, DTDefaultOptions) {

		Db.init(); //should not be neccesary, why did I do that?

		var loadDeferred = null;

		$scope.taxons = Db.taxons()

		/**
			proeve extras
		*/
		Proeve_extras.query({ where : { active: true } }).$promise.then(function(extras) {
			$scope.extra_fields = extras.map(function(extra) {
				extra.model = 'extra'+extra.extras_id
				return extra
			})
		})
		var proeveExtraActive = function(fieldName) {
			var extras = Db.extras();
			for (var i=0, l=extras.length; i<l; i++) {
				if (extras[i].model == fieldName) return true;
			}
			return false;
		}				
		var proeveExtraCaption = function(fieldName) {
			var extras = Db.extras();
			for (var i=0, l=extras.length; i<l; i++) {
				if (extras[i].model == fieldName) return extras[i].caption;
			}
			return false;
		}				
		var proeveExtraCaptionExport = function(fieldName) {
			var extras = Db.extras();
			for (var i=0, l=extras.length; i<l; i++) {
				if (extras[i].model == fieldName) return extras[i].caption_export;
			}
			return false;
		}				


		var vm = this;

		//new loadData
		vm.reloadData = function() {
			loadDeferred = $q.defer() //promisfy it

			Db.reloadProever().then(function(proever) {
				$scope.proever = proever

				var spotString = function(spots) {
					var s = ''
					for (var i=0; i<spots.length; i++) {
						if (s != '') s += "<br>"
						s += spots[i].beskrivelse
					}
					return s
				}
				var kommentarString = function(kommentarer) {
					var s = ''
					for (var i=0; i<kommentarer.length; i++) {
						if (s != '') s += "<br>";
						s += kommentarer[i].kommentar;
					}
					return s
				}
				var analyseDatoerString = function(resultater) {
					var s = ''
					for (var i=0; i<resultater.length; i++) {
						if (s != '') s += "<br>";
						s += Utils.fixDate(resultater[i].datoForAnalyse);
					}
					return s
				}
					
				var lokalitet, spots, items = []
	
				for (var i=0,l=proever.length; i<l; i++) {
					lokalitet = proever[i].Lokalitet
					spots = lokalitet ? Db.lokalitet_spot(lokalitet.lokalitet_id) : []
					var item = {
							proeve_id: proever[i].proeve_id,
							proeve_nr: proever[i].proeve_nr,
							sagsNo: proever[i].booking_id,
	
							kommentar_fixed: !proever[i].Kommentar.length ? '' : kommentarString(proever[i].Kommentar),

							indsamlingsDato: proever[i].indsamlingsDato,
							indsamlingsDato_fixed: Utils.fixDate(proever[i].indsamlingsDato),

							lokalitet: lokalitet ? lokalitet.presentationString : '',
							latitude: lokalitet ? lokalitet.latitude : '',
							longitude: lokalitet ? lokalitet.longitude : '',

							antalIndsamlingsteder: spots.length+1, 
							indsamlerNavn: proever[i].indsamlerNavn,
							indsamlerEmail: proever[i].indsamlerEmail,
							indsamlerInstitution: proever[i].indsamlerInstitution,

							modtagelsesDato: proever[i].modtagelsesDato,
							modtagelsesDato_fixed: Utils.fixDate(proever[i].modtagelsesDato),

							ekstraktionsDato: proever[i].ekstraktionsDato,
							ekstraktionsDato_fixed: Utils.fixDate(proever[i].ekstraktionsDato),

							analyseDatoer: analyseDatoerString(proever[i].Resultat),

							elueringsVolumen: proever[i].elueringsVolumen,
							dataset: proever[i].dataset,
							ngUl: proever[i].ngUl,
							filtreringsVolumen: proever[i].filtreringsVolumen,
							aliquotVolumen: proever[i].aliquotVolumen,

							created_userName: proever[i].created_userName,

							extra1: proever[i].extra1,
							extra2: proever[i].extra2,
							extra3: proever[i].extra3,
							extra4: proever[i].extra4,
							extra5: proever[i].extra5,
							extra6: proever[i].extra6,
							extra7: proever[i].extra7,
							extra8: proever[i].extra8,
							extra9: proever[i].extra9,
							extra10: proever[i].extra10,

							extra11: proever[i].extra11,
							extra12: proever[i].extra12,
							extra13: proever[i].extra13,
							extra14: proever[i].extra14,
							extra15: proever[i].extra15,
							extra16: proever[i].extra16,
							extra17: proever[i].extra17,
							extra18: proever[i].extra18,
							extra19: proever[i].extra19,
							extra20: proever[i].extra20,

							extra21: proever[i].extra11,
							extra22: proever[i].extra12,
							extra23: proever[i].extra13,
							extra24: proever[i].extra14,
							extra25: proever[i].extra15,
							extra26: proever[i].extra16,
							extra27: proever[i].extra17,
							extra28: proever[i].extra18,
							extra29: proever[i].extra19,
							extra30: proever[i].extra20

					}
				
					//extra fields
					for (var f=1; f<21; f++) {
						var field = 'extra'+f;	
						item[field] = proever[i][field]
					}
					items.push(item)
				}					

				$scope.lookupDataset = []
				$scope.lookupIndsamler = []
				$scope.lookupInstitutionsnavn = []
				for (var i=0,l=proever.length; i<l; i++) {
					var proeve = proever[i]
					if (proeve.dataset != undefined && !~$scope.lookupDataset.indexOf(proeve.dataset)) {
						$scope.lookupDataset.push(proeve.dataset)
					}
					if (proeve.indsamlerNavn != undefined && !~$scope.lookupIndsamler.indexOf(proeve.indsamlerNavn)) {
						$scope.lookupIndsamler.push(proeve.indsamlerNavn)
					}
					if (proeve.indsamlerInstitution != undefined && !~$scope.lookupInstitutionsnavn.indexOf(proeve.indsamlerInstitution)) {
						$scope.lookupInstitutionsnavn.push(proeve.indsamlerInstitution)
					}
					if (i == (l-1)) loadDeferred.resolve(items)
				}
			})
			//
			return loadDeferred.promise
		}

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
							$scope.loadResultater(proeve_id)
							resolve(true)
						}
					}
				}
			})
			//here we could raise an error
		}

		$scope.lock = function(mode) {
			//check if we not is about to update a record that is deleted, or is about to be deleted
			if ($scope.isDeleting) return
			var proeve = mode ? { locked_by: Auth.getCurrentUser().name } : { locked_by: null }
			Proeve.update({ id: $scope.proeve.proeve_id }, proeve)
		}

		$scope.saveProeve = function() {
			Proeve.update({ id: $scope.proeve.proeve_id }, $scope.proeve).$promise.then(function(proeve) {	
				$scope.proeve.edited = false;
				/*
				not nessecary, is reloaded when the modal is closed
				$timeout(function() {
					$scope.dtProeveInstance.DataTable.draw()
				})
				*/
			})
		}
		$scope.$watch('proeve.indsamlingsDato', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.indsamlingsDato_fixed = Utils.fixDate($scope.proeve.indsamlingsDato)
		})
		$scope.$watch('proeve.modtagelsesDato', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.modtagelsesDato_fixed = Utils.fixDate($scope.proeve.modtagelsesDato)
		})
		$scope.$watch('proeve.ProeverModtaget', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.ProeverModtaget_fixed = Utils.fixDate($scope.proeve.ProeverModtaget)
		})
		$scope.$watch('proeve.ekstraktionsDato', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.ekstraktionsDato_fixed = Utils.fixDate($scope.proeve.ekstraktionsDato)
		})
		/*
		$scope.$watch('proeve.dataset', function(newVal, oldVal) {
			if (!$scope.proeve || !$scope.proeve.edited) return
			$scope.saveProeve()
			$scope.proeve.DatoForEkst_fixed = Utils.fixDate($scope.proeve.DatoForEkst)
		})
		*/
		var fields = ['proeve.Indsamler','proeve.indsamlerInstitution','proeve.indsamlerEmail', 'proeve.elueringsVolumen', 'proeve.ngUl', 'proeve.AntalMl', 'proeve.aliquotVolumen', 'proeve.dataset',
			'proeve.extra1', 'proeve.extra2', 'proeve.extra3', 'proeve.extra4', 'proeve.extra5', 'proeve.extra6', 'proeve.extra7', 'proeve.extra8', 'proeve.extra9', 'proeve.extra10',
			'proeve.extra11','proeve.extra12','proeve.extra13','proeve.extra14','proeve.extra15','proeve.extra16','proeve.extra17','proeve.extra18','proeve.extra19','proeve.extra20',
			'proeve.extra21','proeve.extra22','proeve.extra23','proeve.extra24','proeve.extra25','proeve.extra26','proeve.extra27','proeve.extra28','proeve.extra29','proeve.extra30']
		$scope.$watchGroup(fields, function(newVal, oldVal) {
			if (newVal == oldVal) return;
			if (!$scope.proeve || !$scope.proeve.edited) return;
			$scope.saveProeve();
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
						$scope.proeve.indsamlerInstitution = value
					}
				})
			}
		})
		$scope.$on('modal.hide', function(e, target){
			if (target.$options.internalName == 'proeve') {
				$scope.dtProeveInstance.reloadData();
				$scope.lock(false);
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

		DTDefaultOptions.setLoadingTemplate('<img src="assets/images/ajax-loader.gif">');

		$scope.proeveOptions = DTOptionsBuilder.fromFnPromise(function() {
			return vm.reloadData()
    })
    .withPaginationType('full_numbers')
    .withDisplayLength(-1)
		.withDOM('lBfrtip')
		.withOption('destroy', true)
		.withOption('autoWidth', false)
		.withOption('stateSave', true)
		.withFixedHeader({
			alwaysCloneTop: true
		})
		.withOption('initComplete', function() {

			$('#dtProeve').on('click', 'tbody tr', function() {
				var proeve = $scope.dtProeveInstance.DataTable.row(this).data()
				$scope.showProeve(proeve.proeve_id)
			})

			//remove any previous set global filters
			$.fn.dataTable.ext.search = [];
			Utils.dtNormalizeLengthMenu();
			Utils.dtNormalizeButtons();
			Utils.dtNormalizeSearch();

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
				filename: 'DNAogLiv_Proever_'+Utils.todayStr(),
				className: 'btn btn-default btn-xs ml25px'
			},
			{ 
				text: 'Opret ny prøve',
				className: 'btn btn-primary btn-xs colvis-btn',
				action: function ( e, dt, node, config ) {
					$scope.createProeve()
 				}
			}
		])
		.withLanguage(Utils.dataTables_daDk);

		$scope.proeveColumns = [
      DTColumnBuilder.newColumn('proeve_id').withTitle('#'),
      DTColumnBuilder.newColumn('proeve_nr').withTitle('PrøveID'),
      DTColumnBuilder.newColumn('indsamlingsDato_fixed').withOption('type', 'dna').withTitle('Indsamlingsdato'),
      DTColumnBuilder.newColumn('lokalitet').withOption('type', 'locale-compare').withTitle('Lokalitet'),
      DTColumnBuilder.newColumn('latitude').withOption('type', 'number').withTitle('Latitude'),
      DTColumnBuilder.newColumn('longitude').withOption('type', 'number').withTitle('Longitude'),
      DTColumnBuilder.newColumn('antalIndsamlingsteder').withTitle('Antal indsamlingsteder'),
      DTColumnBuilder.newColumn('indsamlerNavn').withTitle('Indsamlernavn'),
      DTColumnBuilder.newColumn('indsamlerEmail').withTitle('Indsamler email'),
      DTColumnBuilder.newColumn('indsamlerInstitution').withTitle('Indsamler institutionsnavn'),
      DTColumnBuilder.newColumn('filtreringsVolumen').withTitle('Filtreringsvolumen'),
      DTColumnBuilder.newColumn('modtagelsesDato_fixed').withOption('type', 'dna').withTitle('Modtagelsesdato'),
      DTColumnBuilder.newColumn('ekstraktionsDato_fixed').withOption('type', 'dna').withTitle('Ekstraktionsdato'),
      DTColumnBuilder.newColumn('elueringsVolumen').withTitle('Elueringsvolumen'),
      DTColumnBuilder.newColumn('ngUl').withTitle('DNA ng/µl'),
      DTColumnBuilder.newColumn('aliquotVolumen').withTitle('Aliquot volumen'),
			DTColumnBuilder.newColumn('analyseDatoer').withTitle('Analysedatoer'),

      DTColumnBuilder.newColumn('dataset').withTitle('Datasæt'),
      DTColumnBuilder.newColumn('kommentar_fixed').withOption('class', 'dt-note').withOption('type', 'locale-compare').withTitle('Note')
				.withOption('createdCell', function(td, cellData, rowData, row, col) {
					$(td).attr('title', cellData)
				}),
      DTColumnBuilder.newColumn('created_userName').withTitle('Bruger')
    ];  

		//include active extra fields
		for (var i=1;i<21;i++) {
			var fieldName = 'extra'+i;
			if (proeveExtraActive(fieldName)) {
				$scope.proeveColumns.push(
		      DTColumnBuilder.newColumn(fieldName).withTitle(proeveExtraCaption(fieldName))
				)
			}
		}

		$scope.dtProeveInstance = undefined;
		$scope.dtProeveInstanceCallback = function(instance) {
			$scope.dtProeveInstance = instance;
    };


		/**
			Lokalitet
		**/
		$scope.lokalitet = {}
		$scope.map = false
		$scope.wkt = new Wkt.Wkt()

		$scope.showLokalitet = function(lokalitet_id) {
			LokalitetModal.show($scope, lokalitet_id).then(function(lokalitet) {	
				if (!$scope.proeve.lokalitet_id) {
					Proeve.update({ id: $scope.proeve.proeve_id }, { lokalitet_id: lokalitet.lokalitet_id })
				}
				$scope.proeve.lokalitet = lokalitet.presentationString
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
			return typeof $scope.lokalitet.lokalitet_id == 'number';
		}

		/** 
			kommentarer 
		*/
		$scope.loadKommentarer = function(proeve_id) {
			Kommentar.query( { where: { relation_id: proeve_id, type_id: Utils.KOMMENTAR_TYPE.PROEVE }} ).$promise.then(function(kommentarer) {	
				$scope.proeve.Kommentar = kommentarer
				$scope.dtProeveInstance.DataTable.draw()
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
						$scope.loadKommentarer($scope.proeve.proeve_id);
					})
				}
			})
		}

		/** PrøveID **/
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
							Utils.dtPerformSearch(newProeveNr);
							Db.reloadProever();
							$scope.dtProeveInstance.reloadData(function() {
								$scope.showProeve(proeve.proeve_id)
							}, false)
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
					//set a flag, indicate that the record is about to be deleted
					$scope.isDeleting = true 
					$scope.proeveModal.hide()
					var lokalitet_id = $scope.proeve.lokalitet_id
					Proeve.delete({ id : proeve_id }).$promise.then(function() {	
						Lokalitet.delete({ id: lokalitet_id }).$promise.then(function() {	
						}) 
						$scope.loadData().then(function() {
							$scope.isDeleting = false
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
			$scope.lock(false)
			$location.path('/resultater/'+resultat.resultat_id)
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

