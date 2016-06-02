'use strict';

angular.module('dnalivApp')
  .controller('ResultaterCtrl', ['$scope', '$timeout', '$modal', 'Auth', 'Alert', 'SagsNo', 'Utils', 'Resultat', 'Resultat_item', 'Booking', 
			'Lokalitet', 'LokalitetModal', 'Proeve', 'ProeveNr', 'Taxon',	'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 

	function($scope, $timeout, $modal, Auth, Alert, SagsNo, Utils, Resultat, Resultat_item, Booking, 
			Lokalitet, LokalitetModal, Proeve, ProeveNr, Taxon, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		Booking.query().$promise.then(function(bookings) {	
			$scope.sagsNo = []
			$scope.bookings = bookings
			bookings.forEach(function(booking) {
				$scope.sagsNo[booking.booking_id] = booking.sagsNo
			})
		})

		$scope.loadProever = function() {
			Proeve.query().$promise.then(function(proever) {	
				$scope.proeve_nr = []
				$scope.proever = proever.map(function(proeve) {
					return Utils.getObj(proeve)
				})
				proever.forEach(function(proeve) {
					$scope.proeve_nr[proeve.proeve_id] = proeve.proeve_nr
				})
				$scope.reloadData()
			})
		}
		$scope.loadProever()

		Taxon.query().$promise.then(function(taxons) {	
			$scope.taxon = taxons.map(function(taxon) {
				/*
				now stored as taxon_prioritet in database
				switch (taxon.taxon_artsgruppe) {
					case 'Fisk' :
						taxon.sortOrder = 1; break;
					case 'Guldsmede' :
						taxon.sortOrder = 2; break;
					case 'Biller' :
						taxon.sortOrder = 2; break;
					case 'Tibenede krebsdyr' :
						taxon.sortOrder = 3; break;
					case 'Padder' :
						taxon.sortOrder = 4; break;
					default :
						taxon.sortOrder = 100; break;
				}
				*/
				return Utils.getObj(taxon)
			})
		})

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

		$scope.reloadData = function() {
			$('#dt-tools').detach().appendTo('body').hide()
			Resultat.query().$promise.then(function(resultater) {	
				$scope.resultater = resultater.map(function(resultat) {
					resultat.sagsNo = resultat.booking_id > 0 ? $scope.sagsNo[resultat.booking_id] : '?'
					resultat.proeve_nr = resultat.proeve_id > 0 ? $scope.proeve_nr[resultat.proeve_id] : '?'
					resultat.datoForAnalyse_fixed = resultat.datoForAnalyse ? Utils.fixDate(resultat.datoForAnalyse) : ''

					//convert to date to so we can format the string properly
					resultat.created_timestamp = Date.parse(resultat.created_timestamp)
					return Utils.getObj(resultat)
				})
			})
		}

		$scope.$watch('resultat', function() {
			if ($scope.resultat) $scope.resultat.isEdited = true
		}, true)

		$scope.userFilter = ''
		$scope.setUserFilter = function(userFilter) {
			if (userFilter) {
				$.fn.dataTable.ext.search.push(
			    function( settings, data, dataIndex ) {
						return data[3] == Auth.getCurrentUser().name
					}
				)
			} else {
				$.fn.dataTable.ext.search = []
			}
			$scope.resultaterInstance.DataTable.draw()
		}

		$scope.setResultat = function(resultat_id) {
			$scope.resultat = {}
			$scope.resultater.forEach(function(resultat) {
				if (resultat.resultat_id == resultat_id) {
					Utils.mergeObj($scope.resultat, resultat)
					$scope.resultat.datoForAnalyse_fixed = Utils.fixDate(resultat.datoForAnalyse)
					//console.log(resultat.datoForAnalyse, Utils.fixDate(resultat.datoForAnalyse), $scope.resultat.datoForAnalyse_fixed)
					$scope.idsToTaxon(resultat.taxon_ids)
					$scope.rebuildResultatItems()
				}
			})
		}
			
		$scope.saveResultat = function() {
			$scope.resultat.taxon_ids = $scope.taxonToIds()
			Resultat.update( { resultat_id: $scope.resultat.resultat_id }, $scope.resultat)
			$scope.resultat.isEdited = false
		}
						
		$scope.showResultat = function(resultat_id) {
			$scope.setResultat(resultat_id)

			//taxon
			$scope.taxonOptions = DTOptionsBuilder.newOptions()
				.withOption('destroy', true)
				.withOption('paging', false)
				.withOption('lengthChange', false)
				.withOption('info', false)
				.withOption('searching', false)
				.withOption('autoWidth', true)
		    .withDisplayLength(50)
				.withOption('order', [[ 0, "desc" ]])
				.withOption('initComplete', function() {
				})
				.withLanguage(Utils.dataTables_daDk)

			$scope.taxonColumns = [
	      DTColumnBuilder.newColumn(0).withTitle('Inkl.'),
	      DTColumnBuilder.newColumn(1).withTitle('Artsgruppe'),
	      DTColumnBuilder.newColumn(2).withTitle('Dansk navn'),
	      DTColumnBuilder.newColumn(3).withTitle('Videnskabeligt navn')
	    ]

			$.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col ) {
		    return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		       return $('input', td).prop('checked') ? '1' : '0';
		    } );
			}

			$scope.taxonColumnDefs = [
				{ targets: [0],  orderDataType: "dom-checkbox" }
			]

			$scope.resultatModal = $modal({
				scope: $scope,
				templateUrl: 'app/resultater/resultat.modal.html',
				backdrop: 'static',
				show: true,
				onBeforeShow: function() {
					alert('ok')
				},
				onShow: function() {
					alert('ok')
				},
				onHide: function() {
					alert('ok')
				}

			})
			$scope.resultatModal.$promise.then($scope.resultatModal);


			$scope.resultatModal.$promise.then($scope.resultatModal.show).then(function() {
				$('#unExcludeSelect').on('change', function() {
					 $scope.includeTaxon($(this).val())
				})
			})
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

		$scope.resultaterOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('lBfrtip')
			.withOption('order', [[1, 'asc']])
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
      DTColumnBuilder.newColumn('sagsNo').withTitle('Sagsnr.'),
      DTColumnBuilder.newColumn('proeve_nr').withTitle('Prøvenr.'),
      DTColumnBuilder.newColumn('datoForAnalyse').withTitle('Dato for analyse'),
      DTColumnBuilder.newColumn('created_userName').withTitle('Bruger')
    ]

		$scope.resultaterColumnDefs = []

	
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
			//$scope.taxon.forEach(function(taxon) {
			for (var i = 0, len = $scope.taxon.length; i < len; i++) {
				items[$scope.taxon[i].taxon_id] = []
			}
		
			Resultat_item.query({ where: { resultat_id: $scope.resultat.resultat_id }}).$promise.then(function(resultat_items) {	
				//resultat_items.forEach(function(resultat_item) {
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

		$scope.deleteResultat = function(resultat_id) {
			var date = new Date($scope.resultat.created_timestamp).toLocaleString('da-DK', { hour12: false } ),
					author = $scope.resultat.created_userName;
			Alert.show($scope,'Slet Resultat?', 'Oprettet <b>'+date+'</b> af <b>'+author+'</b>.<br><br>Resultat samt tilhørende replikater vil blive slettet permanent. Vil du fortsætte?').then(function(confirm) {
				if (confirm) {
					Resultat.delete({ id : resultat_id }).$promise.then(function() {	
						$scope.resultatModal.hide()
						$scope.reloadData()
					})
				}
			})
		}

		//
		$scope.updateResultatItem = function(item) {
			Resultat_item.update( { resultat_item_id: item.resultat_item_id }, item )
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
							$scope.reloadData()
							$scope.newProeveNr = $scope.getProeveNr(proeve)
						})
					} else {
						//create lokalitet for the proeve we are about to create
						var lokalitet = LokalitetModal.defaultLokalitet
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
									//$scope.reloadData()
									//$scope.newProeveNr = proeve.proeve_nr
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
						$scope.reloadData()
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
						$scope.resultat.proeve_nr = proeve.proeve_nr
						$scope.reloadData()
						$timeout(function() {
							$scope.resultaterInstance.rerender()
						}, 200)
					})
				}
			})
		}

  }]);
