'use strict';

angular.module('dnalivApp')
  .controller('AdminCtrl', ['$scope', '$http', '$timeout', 'Utils', 'Alert', 'Taxon', 'Proeve', 'Booking', 'Resultat', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',
	 function ($scope, $http, $timeout, Utils, Alert, Taxon, Proeve, Booking, Resultat, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

		/*
			pyramid of doom
			this should really ber done in a more effective way
		*/
		$scope.reloadLockedRows = function() {
			console.log('reloading ...')
			$scope.lockedRows = []
			Proeve.query().$promise.then(function(rows) {	
				rows.forEach(function(row) {
					if (row.locked_by) {
						$scope.lockedRows.push({
							locked_by: row.locked_by,
							type: 'Prøve',
							desc: row.proeve_nr,
							id: row.proeve_id,
							created_userName: row.created_userName,
							created_timestamp: row.created_timestamp
						})
					}
				})
				Booking.query().$promise.then(function(rows) {	
					rows.forEach(function(row) {
						if (row.locked_by) {
							$scope.lockedRows.push({
								locked_by: row.locked_by,
								type: 'Booking',
								desc: row.sagsNo,
								id: row.booking_id,
								created_userName: row.created_userName,
								created_timestamp: row.created_timestamp
							})
						}
					})
					Resultat.query().$promise.then(function(rows) {	
						rows.forEach(function(row) {
							if (row.locked_by) {
								$scope.lockedRows.push({
									locked_by: row.locked_by,
									type: 'Resultat',
									desc: row.resultat_id,
									id: '(B'+row.booking_id+',P'+row.proeve_id+')',
									created_userName: row.created_userName,
									created_timestamp: row.created_timestamp
								})
							}
						})
					})
					$timeout(function() {
						//$scope.dtInstance.reRender()
						//console.log($scope.lockedRows)
					}, 10)
				})
			})
		}

		//substitute for angularstrap Tabs not supporting events or callbacks
		$('body').on('click', 'a[role="tab"]', function(e) {
			var tab = e.toElement.text || false
			switch (tab) {
				case 'Låste poster' :
					$scope.reloadLockedRows()
					break;
				default :
					break;
			}
		})
	
		$scope.unLock = function(lockedRow) {
			Alert.show($scope, 'Lås op', 'Lås post op for redigering?').then(function(confirm) {	
				if (confirm) {
					switch (lockedRow.type) {
						case 'Booking' :
							Booking.update({ id: lockedRow.id }, { locked_by: null })
							break;
						case 'Prøve' :
							Proeve.update({ id: lockedRow.id }, { locked_by: null })
							break;
						case 'Resultat' :
							Resultat.update({ id: lockedRow.id }, { locked_by: null })
							break;
						default :
							break;
					}
					$timeout(function() {
						$scope.reloadData()
					}, 100)
				}
			})
		}			

		$scope.lockedInstance = {}

		$scope.lockedOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('t')
			.withOption('destroy', true)
			.withOption('autoWidth', false)
			.withOption('initComplete', function() {
				$.fn.dataTable.ext.search = []
				/*
				Utils.dtNormalizeLengthMenu()
				Utils.dtNormalizeButtons()
				Utils.dtNormalizeSearch()
				*/
			})
		/*
		$scope.lockedColumns = [
      DTColumnBuilder.newColumn('locked_by').withTitle('Låst af bruger'),
      DTColumnBuilder.newColumn('type').withTitle('Type'),
      DTColumnBuilder.newColumn('desc').withTitle('Kode/Nr.'),
      DTColumnBuilder.newColumn('id').withTitle('#id'),
      DTColumnBuilder.newColumn('created_userName').withTitle('Oprettet af'),
      DTColumnBuilder.newColumn('created_timestamp').withTitle('Oprettet'),
      DTColumnBuilder.newColumn('').withTitle('')
		]
		*/

		$scope.dndInserted = function() {
			return false
    }

		$scope.dragoverCallback = function(event, index, external, type) {
			return true
		}

		$scope.dropCallback = function(event, index, item, external, type) {
			$scope.taxonsUnordered.forEach(function(taxon) {
				if (taxon.taxon_id == item.taxon_id) {
					taxon.taxon_prioritet = index
					Taxon.update({ taxon_id: taxon.taxon_id }, taxon).$promise.then(function(taxon) {	
						$scope.reloadTaxons()
					})
				}
			})
			return item;
		}

		$scope.taxonOrderBy = 'taxon_prioritet';

		$scope.taxonOrders = [
			{ "value": "taxon_prioritet", "text": "Prioritet", "class": "btn-danger" }, 
			{ "value": "taxon_navn_dk", "text": "Navn", "class": "btn-inverse" }, 
			{ "value": "taxon_artsgruppe", "text": "Artsgruppe", "class": "btn-success" },
			{ "value": "!taxon_basisliste", "text": "Basisliste", "class": "btn-success" }
		]

		$scope.prioritetList = [1,2,3,4,5]

		$scope.reloadTaxons = function() {
			Taxon.query().$promise.then(function(taxons) {	

				$scope.taxonsUnordered = taxons.map(function(taxon) {
					return { 
						taxon_id: taxon.taxon_id,
						taxon_navn: taxon.taxon_navn, 
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_basisliste: taxon.taxon_basisliste,
						taxon_prioritet: taxon.taxon_prioritet,
						taxon_artsgruppe: taxon.taxon_artsgruppe,
						edited: false
					}
				})

				/*
				$scope.taxons = {};
				taxons.forEach(function(taxon) {
					if (!$scope.taxons[taxon.taxon_artsgruppe]) $scope.taxons[taxon.taxon_artsgruppe] = [];
					$scope.taxons[taxon.taxon_artsgruppe].push({ 
						taxon_id: taxon.taxon_id,
						taxon_navn: taxon.taxon_navn, 
						taxon_navn_dk: taxon.taxon_navn_dk,
						taxon_basisliste: taxon.taxon_basisliste,
						taxon_prioritet: taxon.taxon_prioritet,
						taxon_artsgruppe: taxon.taxon_artsgruppe,
						edited: false
					})
				})
				*/

			})
		}
		$scope.reloadTaxons();

		$scope.artInfo = {};
		$scope.taxon = { Videnskabeligt_navn : '' };

		$scope.loadArtInfo = function() {
			$.get('http://allearter-databasen.dk/api/?get=art&query='+$scope.taxon.Videnskabeligt_navn, function(art) {
				$scope.artInfo = art.allearter[0];
			})
		}

		$scope.$watch('taxon', function(a, b) {
			if (a.Videnskabeligt_navn != b.Videnskabeligt_navn) {
				$scope.loadArtInfo()
			}
		}, true)

		$scope.taxonCreate = function() {
			Taxon.save({ taxon_id: '' }, {
				taxon_navn: $scope.artInfo.Videnskabeligt_navn,
				taxon_navn_dk: $scope.artInfo.Dansk_navn,
				taxon_artsgruppe: $scope.artInfo.Artsgruppe_dk,
				taxon_prioritet: 0, //sæt to lowest prioritet prossible
				taxon_basisliste: 1
			}).$promise.then(function(taxon) {	
				$scope.reloadTaxons();
			})
		}
		
		$scope.basislisteToggle = function(taxon) {
			Taxon.update({ taxon_id: taxon.taxon_id }, taxon);
		}

		$scope.saveTaxon = function(art) {
			Taxon.update({ taxon_id: art.taxon_id }, art)
			art.edited = false
		}


}]);

