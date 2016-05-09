'use strict';

angular.module('dnalivApp')
  .controller('ResultaterCtrl', ['$scope', '$timeout', '$modal', 'Auth', 'Alert', 'Utils', 'Resultat', 'Resultat_item', 'Booking', 'Proeve', 'ProeveNr', 'Taxon',
																'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', 

	function($scope, $timeout, $modal, Auth, Alert, Utils, Resultat, Resultat_item, Booking, Proeve, ProeveNr, Taxon,
					DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		Booking.query().$promise.then(function(bookings) {	
			$scope.sagsNo = []
			$scope.bookings = bookings
			bookings.forEach(function(booking) {
				$scope.sagsNo[booking.booking_id] = booking.sagsNo
			})
			$scope.reloadData()
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
			})
		}
		$scope.loadProever()

		Taxon.query().$promise.then(function(taxons) {	
			$scope.taxon = taxons.map(function(taxon) {
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
				console.log(taxon.taxon_basisliste)
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
					resultat.sagsNo = resultat.booking_id > 0 ? $scope.sagsNo[resultat.booking_id] : '<ikke sat>'
					resultat.proeve_nr = resultat.proeve_id > 0 ? $scope.proeve_nr[resultat.proeve_id] : '<ikke sat>'
					//resultat.datoForAnalyse = Date.parse(resultat.datoForAnalyse)
					//console.log(resultat.datoForAnalyse)
					resultat.datoForAnalyse_fixed = resultat.datoForAnalyse ? Utils.fixDate(resultat.datoForAnalyse) : ''
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
					//console.log($scope.resultat)
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

			var modal = $modal({
				scope: $scope,
				templateUrl: 'app/resultater/resultat.modal.html',
				backdrop: 'static',
				show: true
			})

			modal.$promise.then(modal.show).then(function() {
				$('#unExcludeSelect').on('change', function() {
					 $scope.includeTaxon($(this).val())
				})
				$('.booking-typeahead').typeahead({
					showHintOnFocus: true,
					source: $scope.bookings,
					displayText: function(item) {
						return item.sagsNo
					},
					items: 15,
					afterSelect: function(item) {
						$timeout(function() {
							$scope.resultat.booking_id = item.booking_id
							$scope.resultat.datoForAnalyse = item.DatoForBesoeg
							$scope.resultat.datoForAnalyse_fixed = Utils.fixDate(item.DatoForBesoeg)
						})
					}

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
			.withOption('initComplete', function() {
				//style the row length menu 
				document.querySelector('.dataTables_length select').className += 'form-control inject-control'
				var input = document.querySelector('.dataTables_filter input')
				input.className += 'form-control inject-control'
				input.style.padding = '5px'
				input.placeholder = 'skriv ..'
				if ($scope.newProeveNr) {
					input.value = $scope.newProeveNr
					$(input).trigger('keyup')
					$scope.newProeveNr = false
				}
				$scope.inputFilter = input

				Utils.dtNormalizeButtons()

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
			.withLanguage(Utils.dataTables_daDk)

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
			$scope.taxon.forEach(function(taxon) {
				items[taxon.taxon_id] = []
			})
			/*
			$scope.resultat_items.forEach(function(resultat_item) {
				if (resultat_item.resultat_id == $scope.resultat.resultat_id) {
					//set a isNull value, indicating we should overrule first click values
					resultat_item.isNull = resultat_item.positiv == null || resultat_item.negativ == null || resultat_item.eDNA == null
					items[resultat_item.taxon_id].push(resultat_item)
				}
			})
			*/
			
			/*
			var params = {
				where: {
						resultat_id: 2
					}
				};
			*/
			Resultat_item.query({ where: { resultat_id: $scope.resultat.resultat_id }}).$promise.then(function(resultat_items) {	
				resultat_items.forEach(function(resultat_item) {
					//set a isNull value, indicating we should overrule first click values
					resultat_item.isNull = resultat_item.positiv == null || resultat_item.negativ == null || resultat_item.eDNA == null
					items[resultat_item.taxon_id].push(resultat_item)
				})
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
				//$scope.resultat_items.push(Utils.getObj(resultat_item))
				$scope.rebuildResultatItems()
			})
		}

		//
		$scope.updateResultatItem = function(item) {
			Resultat_item.update( { resultat_item_id: item.resultat_item_id }, item )
		}
		$scope.resultatValueClick = function(name, defaultValue, item) {
			if (item.isNull) {
				item[name] = defaultValue
			}

			item.negativ = item.negativ != null ? item.negativ : false
			item.positiv = item.positiv != null ? item.positiv : true
			item.eDNA = item.eDNA != null ? item.eDNA : true

			//"calc" database_result
			//item.database_result = item.negativ	== false && item.positiv == true //&& item.eDNA != null
			if (item.negativ == false && item.positiv == true) {
				item.database_result = true
			} else {
				item.database_result = false
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
				$scope.resultat = resultat
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
						var proeve = {
							proeve_nr: proeve
						}
						Proeve.save( { proeve_id: '' }, proeve).$promise.then(function(proeve) {	
							$scope.loadProever()
							resultat.proeve_id = proeve.proeve_id
							Resultat.save( { resultat_id: '' }, resultat ).$promise.then(function(resultat) {	
								$scope.reloadData()
								$scope.newProeveNr = proeve.proeve_nr
							})
						})
					}
				}
			})
		}


  }]);
