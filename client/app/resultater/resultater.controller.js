'use strict';

angular.module('dnalivApp')
  .controller('ResultaterCtrl', ['$scope', '$routeParams', '$timeout', '$q', '$modal', '$http', 'Auth', 'Alert', 'SagsNo', 'Db', 'Utils', 'Resultat', 'Resultat_item', 
			'Kommentar', 'KommentarModal', 'Lokalitet', 'LokalitetModal', 'Proeve', 'ProeveNr', 'Taxon',	
			'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 'DTDefaultOptions', 

	function($scope, $routeParams, $timeout, $q, $modal, $http, Auth, Alert, SagsNo, Db, Utils, Resultat, Resultat_item, 
			Kommentar, KommentarModal, Lokalitet, LokalitetModal, Proeve, ProeveNr, Taxon, 
			DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, DTDefaultOptions) {

		$scope.sagsNo = [];
		$scope.bookings = Db.bookings();
		$scope.bookings.forEach(function(booking) {
			$scope.sagsNo[booking.booking_id] = booking.sagsNo
		});

		$scope.proeve_nr = [];
		$scope.proever = Db.proever();
		$scope.proever.forEach(function(proeve) {
			$scope.proeve_nr[proeve.proeve_id] = proeve.proeve_nr
		});

		$scope.taxon = Db.taxons()
		$scope.getTaxon = function(taxon_id) {
			for (var i=0;i<$scope.taxon.length; i++) {
				if ($scope.taxon[i].taxon_id == taxon_id) {
					return Utils.getObj($scope.taxon[i])
				}
			}
		}
		$scope.taxonToIds = function() {
			var ids = []
			$scope.taxon.forEach(function(taxon) {
				if (taxon.taxonSelected) ids.push(taxon.taxon_id)
			}) 
			return ids.join(',')
		}
		$scope.idsToTaxon = function(ids) {
			$scope.excludedTaxons = [{
				taxon_id: -1,
				art: 'Gentilføj art'
			}]
			ids = ids || ''
			ids = ids.split(',')
			$scope.taxon.forEach(function(taxon) {
				taxon.taxonSelected = ids.indexOf(taxon.taxon_id.toString()) > -1
				//update the list of excluded taxons
				if (!taxon.taxonSelected) {
					$scope.excludedTaxons.push({
						taxon_id: taxon.taxon_id,
						art: taxon.taxon_navn_dk
					})
				}
			}) 
		}
		$scope.defaultTaxonIds = function() {
			var ids = []
			$scope.taxon.forEach(function(taxon) {
				if (taxon.taxon_basisliste) ids.push(taxon.taxon_id)
			}) 
			return ids.join(',')
		}

		$scope.taxonRowClass = function(selected) {
			return selected ? 'active' : 'danger'
		}

		var vm = this;
		vm.reloadData = function() {
			var loadDeferred = $q.defer();

			function getProeveData(proeve_id, resultat) {
				var proever = Db.proever()
				for (var i=0, l=proever.length; i<l; i++) {
					if (proever[i].proeve_id == proeve_id) {
						resultat.lokalitet = proever[i].Lokalitet ? proever[i].Lokalitet.presentationString : ''
						resultat.dataset = proever[i].dataset
						return
					}
				}
				return ''
			}
		
			var resultatKommentarer = [];
			Kommentar.query( { where: { type_id: Utils.KOMMENTAR_TYPE.RESULTAT }} ).$promise.then(function(kommentarer) {	
				resultatKommentarer = kommentarer;
				function getKommentarer(resultat_id, resultat) {
					var k='';
					for (var i=0, l=resultatKommentarer.length; i<l; i++) {
						if (resultatKommentarer[i].relation_id == resultat_id) {
							if (k!='') k+='<br>';
							k+=resultatKommentarer[i].kommentar;
						}
					}
					return k
				}
			
				Resultat.query().$promise.then(function(resultater) {	
					$scope.resultater = [];
					var resultat;
					for (var i=0, l=resultater.length; i<l; i++) {
						resultat = resultater[i];
						getProeveData(resultat.proeve_id, resultat)
						resultat.noter = getKommentarer(resultat.resultat_id)
						resultat.sagsNo = resultat.booking_id > 0 ? $scope.sagsNo[resultat.booking_id] : '?'
						resultat.proeve_nr = resultat.proeve_id > 0 ? $scope.proeve_nr[resultat.proeve_id] : '?'
						resultat.datoForAnalyse_fixed = resultat.datoForAnalyse ? Utils.fixDate(resultat.datoForAnalyse) : ''
						resultat.created_timestamp = Date.parse(resultat.created_timestamp)
						$scope.resultater.push(Utils.getObj(resultat));
	
						if (i == l-1) {
							loadDeferred.resolve($scope.resultater)
						}
					}
				})  
			})
			return loadDeferred.promise
		}


		$scope.$watch('resultat', function() {
			if ($scope.resultat) $scope.resultat.isEdited = true
		}, true)

		$scope.userFilter = ''
		$scope.setUserFilter = function(userFilter) {
			if (userFilter) {
				$.fn.dataTable.ext.search.push(
			    function( settings, data, dataIndex ) {
						return data[6] == Auth.getCurrentUser().name
					}
				)
			} else {
				$.fn.dataTable.ext.search = []
			}
			$scope.resultaterInstance.DataTable.draw()
		}

		$scope.lock = function(mode) {
			var resultat = mode ? { locked_by: Auth.getCurrentUser().name } : { locked_by: null }
			Resultat.update( { id: $scope.resultat.resultat_id }, resultat)
		}

		$scope.setResultat = function(resultat_id) {
			return $q(function(resolve, reject) {
				for (var i=0; i<$scope.resultater.length; i++) {
					if ($scope.resultater[i].resultat_id == resultat_id) {
						if ($scope.resultater[i].locked_by &&
								$scope.resultater[i].locked_by != Auth.getCurrentUser().name ) {
							Alert.show($scope, 'Resultatet er låst', 'Dette resultat redigeres pt. af <strong>'+$scope.resultater[i].locked_by+'</strong>.', true)
						} else {
							var resultat = $scope.resultater[i]
							$scope.resultat = {}
							Utils.mergeObj($scope.resultat, resultat)
							$scope.resultat.datoForAnalyse_fixed = Utils.fixDate(resultat.datoForAnalyse)
							$scope.idsToTaxon(resultat.taxon_ids)
							$scope.rebuildResultatItems()
							$scope.loadKommentarer()
							resolve(true)
						}
					}
				}
			})
		}
			
		$scope.saveResultat = function() {
			$scope.resultat.taxon_ids = $scope.taxonToIds()
			Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat)
			$scope.resultat.isEdited = false
		}
						
		$scope.$watch('resultat.datoForAnalyse', function(newVal, oldVal) {
			var date = Date.parse(newVal)
			if (newVal != oldVal && !isNaN(date)) {
				//add 12 hours
				date = new Date().setTime(date + (2*60*60*1000))
				$scope.resultat.datoForAnalyse = date
				$scope.resultat.datoForAnalyse_fixed = Utils.fixDate(date)
				$scope.saveResultat()
			}
		})

		/* dataTable */
		DTDefaultOptions.setLoadingTemplate('<img src="assets/images/ajax-loader.gif">')

		$scope.resultaterOptions = DTOptionsBuilder.fromFnPromise(function() {
				return vm.reloadData()
	    })
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('lBfrtip')
			.withOption('order', [[1, 'asc']])
			.withOption('stateSave', true)
			.withFixedHeader({
				alwaysCloneTop: true
			})
			.withOption('initComplete', function() {
				Utils.dtNormalizeLengthMenu()
				Utils.dtNormalizeButtons()
				Utils.dtNormalizeSearch()
				if ($scope.newProeveNr) {
					Utils.dtPerformSearch($scope.newProeveNr)
					$scope.newProeveNr = false
				}
			})
			.withButtons([ 
				{ extend : 'colvis',
					overlayFade: 0,
					text: 'Vis kolonner &nbsp;<i class="fa fa-sort-down" style="position:relative;top:-3px;"></i>',
					className: 'btn btn-default btn-xs colvis-btn',
				}, 
				{ 
					extend : 'excelHtml5',
					text: '<i class="fa fa-download" title="Download aktuelle rækker som Excel-regneark"></i>&nbsp;Excel',
					filename: 'DNAogLiv_Resultater_'+Utils.todayStr(),
					className: 'btn btn-default btn-xs ml25px'
				},
				{ text: 'Nyt resultat',
					className: 'btn btn-primary btn-xs colvis-btn',
					action: function ( e, dt, node, config ) {
						$scope.createResultat()
 					}
				},
				{ text: '<input type="checkbox" id="userFilter" ng-model="userFilter"/><label for="userFilter">Vis kun egne resultater</label>',
					className: 'colvis-btn userFilter',
					action: function ( e, dt, node, config ) {
						$scope.userFilter = !$scope.userFilter
						$(node).find('input').prop('checked', $scope.userFilter)
						$scope.setUserFilter($scope.userFilter)
 					}
				}
			])
			.withLanguage(Utils.dataTables_daDk);

		$scope.resultaterInstance = {}

		$scope.resultaterColumns = [
      DTColumnBuilder.newColumn('resultat_id').withTitle('#'),
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('proeve_nr').withTitle('PrøveID'),
      DTColumnBuilder.newColumn('lokalitet').withTitle('Lokalitet'),
      DTColumnBuilder.newColumn('datoForAnalyse_fixed').withOption('type', 'dna').withTitle('Analysedato'),
      DTColumnBuilder.newColumn('dataset').withTitle('Datasæt'),
      DTColumnBuilder.newColumn('noter').withTitle('Noter'),
      DTColumnBuilder.newColumn('created_userName').withTitle('Bruger')
    ]

		$('#resultaterTable').on('click', 'tbody tr', function() {
			var resultat = $scope.resultaterInstance.DataTable.row(this).data();
			$scope.showResultat(resultat.resultat_id)
		})

		//log download to udtraek.log
		$('#resultaterTable').on('buttons-action.dt', function(e, buttonApi, dataTable, node, config) {
			if (config.className.match(/buttons-excel/)) {
				var columns = Utils.visibleColumnNames($scope.resultaterInstance);
				var user = Auth.getCurrentUser();
				var params = {
					userName: user.name,
					userEmail: user.email,
					filter: 'Filter:"'+$scope.resultaterInstance.DataTable.search()+'"',
					type: 'Resultater',
					fields: columns
				}
				$http.post('api/extras/log', params ).then(function(res) {
					//console.log(res);
				})
			}
		});

		/**
			resultat item
		 **/
		$scope.deleteResultatItem = function(resultat_item) {
			Alert.show($scope, 'Slet replikat?', 'Dette vil slette oplysninger om replikatet permanent. Er du sikker på du vil slette?').then(function(confirm) {	
				if (confirm) {
					Resultat_item.delete({ id: resultat_item.resultat_item_id }).$promise.then(function() {
						$scope.rebuildResultatItems()
					})
				}
			})
		}
			
		$scope.rebuildResultatItems = function() {
			var items = []
			for (var i = 0, len = $scope.taxon.length; i < len; i++) {
				items[$scope.taxon[i].taxon_id] = []
			}
		
			Resultat_item.query({ where: { resultat_id: $scope.resultat.resultat_id }}).$promise.then(function(resultat_items) {	
				for (var i = 0, resultat_item = null, len = resultat_items.length; i < len; i++) {
					//set a isNull value, indicating we should overrule first click values
					resultat_item = resultat_items[i]
					resultat_item.isNull = resultat_item.positiv == null || resultat_item.negativ == null || resultat_item.eDNA == null
					items[resultat_item.taxon_id].push(resultat_item)
				}
				$scope.resultat.resultat_items = items
			})
		}

		$scope.createResultatItem = function(taxon_id) {
			var resultat_item = {
				resultat_id: $scope.resultat.resultat_id,
				taxon_id: taxon_id,
				negativ: null,
				positiv: null,
				eDNA: null
			}
			Resultat_item.save( { resultat_item_id: '' }, resultat_item ).$promise.then(function(resultat_item) {
				$scope.rebuildResultatItems()
			})
		}

		$scope.showResultat = function(resultat_id) {
			$scope.setResultat(resultat_id).then(function() {
				$scope.lock(true)
				$scope.resultatModal = $modal({
					scope: $scope,
					templateUrl: 'app/resultater/resultat.modal.html',
					backdrop: 'static',
					show: true
				});
				$scope.$on('modal.show', function(e, target) {
					$('#unExcludeSelect').on('change', function() {
						 $scope.includeTaxon($(this).val())
					})
				});
				$scope.resultatModalClose = function() {
					$scope.resultatModal.hide();
					$scope.lock(false);
					$scope.resultaterInstance.reloadData();
				}
			})
		}

		$scope.deleteResultat = function(resultat_id) {
			var date = new Date($scope.resultat.created_timestamp).toLocaleString('da-DK', { hour12: false } );
			var author = $scope.resultat.created_userName;
			Alert.show($scope,'Slet Resultat?', 'Oprettet <b>'+date+'</b> af <b>'+author+'</b>.<br><br>Resultat samt tilhørende replikater vil blive slettet permanent. Vil du fortsætte?').then(function(confirm) {
				if (confirm) {
					Resultat_item.query({ where : { resultat_id : resultat_id }}).$promise.then(function(items) {
						items.forEach(function(item) {
							Resultat_item.delete({ id: item.resultat_item_id });
						});
						$scope.resultatModal.hide();
						$timeout(function() {
							Resultat.delete({ id : resultat_id }).$promise.then(function() {
								$scope.resultaterInstance.reloadData();
							});
						});
					});
				}
			});
		}

		//
		$scope.updateResultatItem = function(item) {
			Resultat_item.update( { resultat_item_id: item.resultat_item_id }, item );
		}
		$scope.resultatValueClick = function(item) {
			if (item.isNull) {
				item.negativ = false
				item.positiv = true
				item.eDNA = false
				item.database_result = true
				item.isNull = false
			}
			Resultat_item.update( { resultat_item_id: item.resultat_item_id }, item )
		}
		$scope.excludeTaxon = function(taxon_id) {
			var ids = $scope.taxonToIds().split(',')
			ids.splice(ids.indexOf(taxon_id.toString()), 1)
			$scope.resultat.taxon_ids = ids.join(',')
			Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat ).$promise.then(function(resultat) {
				$scope.idsToTaxon(resultat.taxon_ids)
				$scope.rebuildResultatItems()
			})
		}			
		$scope.includeTaxon = function(taxon_id) {
			var ids = $scope.taxonToIds().split(',')
			ids.push(taxon_id)
			$scope.resultat.taxon_ids = ids.join(',')
			Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat ).$promise.then(function(resultat) {
				$scope.resultat.taxon_ids = resultat.taxon_ids
				$scope.idsToTaxon(resultat.taxon_ids)
				$scope.rebuildResultatItems()
			})
		}			

		$scope.getProeveNr = function(proeve_id) {
			for (var i=0;i<$scope.proever.length;i++) {
				if ($scope.proever[i].proeve_id == proeve_id) {
					return $scope.proever[i].proeve_nr
				}
			}
			return 'ERROR'
		}

		/** 
				createResultat
		 **/
		$scope.createResultat = function() {
			ProeveNr.attachTo($scope).then(function(proeve) {
				if (proeve) {
					var resultat = {
						created_userName: Auth.getCurrentUser().name,
						taxon_ids: $scope.defaultTaxonIds()
					}
					//we trust typeof number as referring to a proeve_id
					if (typeof proeve == 'number') {
						resultat.proeve_id = proeve
						Resultat.save( { resultat_id: '' }, resultat ).$promise.then(function(resultat) {	
							$scope.newProeveNr = $scope.getProeveNr(proeve);
							$scope.resultaterInstance.reloadData();
						})
					} else {
						//create lokalitet for the proeve we are about to create
						var lokalitet = LokalitetModal.defaultLokalitet;
						Lokalitet.save({ lokalitet_id: '' }, lokalitet).$promise.then(function(lokalitet) {
							var insert_proeve = {
								proeve_nr: proeve,
								lokalitet_id: lokalitet.lokalitet_id,
								created_userName: Auth.getCurrentUser().name
							}
							Proeve.save( { proeve_id: '' }, insert_proeve).$promise.then(function(proeve) {	
								$scope.newProeveNr = proeve.proeve_nr
								$scope.loadProever()
								resultat.proeve_id = proeve.proeve_id
								Resultat.save( { resultat_id: '' }, resultat ).$promise.then(function(resultat) {	
									$scope.resultaterInstance.reloadData();
								})
							})
						})
					}
				}
			})
		}

		$scope.changeSagsNo = function() {
			SagsNo.select($scope, $scope.resultat.sagsNo).then(function(response) {
				if (response) {
					$scope.resultat.booking_id = response.booking_id
					$scope.resultat.datoForAnalyse = response.DatoForBesoeg
					$scope.resultat.datoForAnalyse_fixed = Utils.fixDate(response.DatoForBesoeg)

					Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat ).$promise.then(function(resultat) {
						$scope.resultat.sagsNo = response.sagsNo
						$timeout(function() {
							$scope.resultaterInstance.rerender()
						}, 200)
					})

				}
			})
		}

		$scope.changeProeveNr = function() {
			ProeveNr.select($scope, $scope.resultat.proeve_nr).then(function(proeve) {
				if (proeve) {
					$scope.resultat.proeve_id = proeve.proeve_id
					Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat ).$promise.then(function(resultat) {
						$scope.resultat.proeve_nr = proeve.proeve_nr;
						$scope.resultaterInstance.reloadData();
					})
				}
			})
		}

		/**
			kommentarer
		*/
		$scope.loadKommentarer = function() {
			Kommentar.query( { where: { relation_id: $scope.resultat.resultat_id, type_id: Utils.KOMMENTAR_TYPE.RESULTAT }} ).$promise.then(function(kommentarer) {	
				$scope.resultat.kommentarer = kommentarer
			})
		}

		$scope.addKommentar = function() {
			KommentarModal.show($scope).then(function(kommentar) {	
				var kommentar = {
					kommentar: kommentar,
					type_id: Utils.KOMMENTAR_TYPE.RESULTAT,
					relation_id: $scope.resultat.resultat_id,
					created_userName: Auth.getCurrentUser().name
				}
				Kommentar.save(kommentar).$promise.then(function() {	
					$scope.loadKommentarer()
				})
			})
		}	

		$scope.removeKommentar = function(kommentar_id) {
			Alert.show($scope,'Slet notat', 'Slet note / kommentar - er du sikker?').then(function(confirm) {
				if (confirm) {
					Kommentar.delete({ id: kommentar_id}).$promise.then(function() {	
						$scope.loadKommentarer()
					})
				}
			})
		}

		/**
			automatically show a resultat, i.e when resultater/id
		*/
		if ($routeParams.id) {
			$timeout(function() {
				$scope.showResultat($routeParams.id)
			}, 1000)
		}


  }]);
