'use strict';

angular.module('dnalivApp')
  .controller('AdminCtrl', ['ItemsService', '$scope', '$http', '$timeout', '$modal', 'User', 'Utils', 'Alert', 'Taxon', 'Proeve', 'Booking', 'Proeve_extras',
			'Resultat', 'Resultat_item', 'System_user', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder',

	 function (ItemsService, $scope, $http, $timeout, $modal, User, Utils, Alert, Taxon, Proeve, Booking, Proeve_extras,
			Resultat, Resultat_item, System_user, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {


/**
	extra fields
**/
		$scope.extrasType = [
			'<Ikke sat>',
			'Heltal',
			'Kommatal',
			'Dato',
			'Tekst (50)',
			'Tekst (memo)'
		]

		$scope.extrasActive = [
			{ "value": 0, "text": "Deaktiveret", "class": "btn-danger" }, 
			{ "value": 1, "text": "Aktiveret", "class": "btn-success" }
		]

		Proeve_extras.query().$promise.then(function(extras) {
			$scope.proeve_extras = extras.map(function(extra) {
				extra.modified = false
				return Utils.getObj(extra)
			})
		})

		$scope.extraModified = function(extra) {
			return extra.modified
		}

		$scope.updateExtra = function(extra) {
			Proeve_extras.update({ id: extra.extras_id }, extra).$promise.then(function() {
				extra.modified = false;
				Db.reloadExtras();
			})
		}
				
	
		/*
			pyramid of doom
			this should really ber done in a more effective way
		*/
		$scope.reloadLockedRows = function() {
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
									id: row.resultat_id,
									desc: '(B'+row.booking_id+',P'+row.proeve_id+')',
									created_userName: row.created_userName,
									created_timestamp: row.created_timestamp
								})
							}
						})
					})
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
						$scope.reloadLockedRows()
					}, 500)
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
			.withFixedHeader({
				header: false
			})
			.withOption('initComplete', function() {
				$.fn.dataTable.ext.search = []

				var fixedHeaderEle = document.getElementsByClassName('fixedHeader-floating');
				angular.element(fixedHeaderEle).remove();
			})
			.withLanguage(Utils.dataTables_daDk);


/**
	taxons
**/
		$scope.dragoverCallback = function(event, index, external, type) {
			return true
		}

		$scope.reorderTaxons = function() {
			var count = 0;
			$('#list-taxon li').each(function(index, li) {
				var taxon_id = $(li).attr('data-taxon-id')
				if (taxon_id) {
					count++
					Taxon.update({ id: taxon_id }, { taxon_prioritet: count }).$promise.then(function(taxon) {	
					})
				}
			}).promise().done( function(){
				$scope.reloadTaxons()
			})
		}

		$scope.dropCallback = function(event, index, item, external, type) {
			$scope.taxonsUnordered.forEach(function(taxon) {
				if (taxon.taxon_id == item.taxon_id) {
					taxon.taxon_prioritet = index
					Taxon.update({ taxon_id: taxon.taxon_id }, taxon).$promise.then(function(taxon) {	
						$scope.reorderTaxons()
					})
				}
			})
			return true;
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
				$scope.taxon.Videnskabeligt_navn = ''
				$scope.taxon.Dansk_navn = ''
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

		$scope.taxonInUse = function(taxon_id) {
			return $scope.taxon_usage[taxon_id] && $scope.taxon_usage[taxon_id] > 0
		}

		$scope.buildTaxonMap = function() {
			$scope.taxon_usage = [];
			Taxon.query().$promise.then(function(taxons) {	
				taxons.forEach(function(taxon) {
					Resultat_item.query({ where: { taxon_id: taxon.taxon_id }}).$promise.then(function(resultat_items) {	
						$scope.taxon_usage[taxon.taxon_id] = resultat_items.length
					})
				})
			})
		}
		$scope.buildTaxonMap()

		$scope.deleteTaxon = function(taxon) {
			Alert.show($scope, 'Slet taxon?', 'Slet <em>'+taxon.taxon_navn+'</em>, <b>'+taxon.taxon_navn_dk+'</b>, fra artsliten?').then(function(confirm) {	
				if (confirm) {
					Taxon.remove({ id: taxon.taxon_id}).$promise.then(function(result) {
						$scope.reloadTaxons()
					})
				}
			})
		}

		/**
			system users
		*/
		/*
		System_user.query().$promise.then(function(users) {
			$scope.users = users
		})

		$scope.usersOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(-1)
			.withDOM('t')
			.withOption('destroy', true)
			.withOption('initComplete', function() {

				var fixedHeaderEle = document.getElementsByClassName('fixedHeader-floating');
				console.log(fixedHeaderEle)
				angular.element(fixedHeaderEle).remove();

				$.fn.dataTable.ext.search = []
				Utils.dtNormalizeLengthMenu()
				Utils.dtNormalizeSearch()
			})
			.withLanguage(Utils.dataTables_daDk)

		$scope.usersColumns = [
      DTColumnBuilder.newColumn(0).withTitle('Navn'),
      DTColumnBuilder.newColumn(1).withTitle('Email'),
      DTColumnBuilder.newColumn(2).withTitle('Password'),
      DTColumnBuilder.newColumn(3).withTitle('Role')
    ];  

		$scope.usersInstance = {}

		$scope.showUser = function(user) {
			if (user) {
				$scope.userModalUser = user
				$scope.userModalUser.title = "Rediger bruger <b>"+user.name+'</b>'
			} else {
				$scope.userModalUser = {
					name: 'bruger'+($scope.users.length+1).toString(),
					password: '',
					email: '',
					role: 'Gæst',
					title: 'Opret ny bruger'
				}
			}
			$scope.userModal = $modal({
				scope: $scope,
				templateUrl: 'app/admin/user.modal.html',
				backdrop: 'static',
				user: user,
				show: true,
				internalName: 'modalUser'
			})
			$scope.$on('modal.hide', function(e, target){
				if (target.$options.internalName == 'modalUser') {
				}
			})
			$scope.$on('modal.show', function(e, target){
				if (target.$options.internalName == 'modalUser') {
				}
			})
		}

		$scope.saveUser = function() {
			if ($scope.userModalUser.user_id) {
				System_user.update({ id: $scope.userModalUser.user_id }, $scope.userModalUser).$promise.then(function(user) {
				})
			} else {
				System_user.save({ id: '' }, $scope.userModalUser).$promise.then(function(user) {
					$scope.users.push(user)
				})
			}
		}

		$scope.updateSystemUsers = function() {
			console.log(User);
		}			
		*/
	
}]);

