	'use strict';

angular.module('dnalivApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
	'mgcrea.ngStrap', 
	'cfp.hotkeys',
	'LocalStorageModule',
	'angular-inview',
	'leaflet-directive',
	'datatables',
	'datatables.buttons',
	'datatables.bootstrap',
	'datatables.fixedheader',
	'datatables.options',
	'dndLists',
	'ngTagsInput',
	'bootstrap3-typeahead'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $routeProvider.otherwise({
			redirectTo: '/'
		});

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

		$compileProvider.debugInfoEnabled(false);
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, Db) {

		//ensure all table is loaded
		Db.init().then(function() {
			$rootScope.$on('$routeChangeStart', function (event, next) {
				Auth.isLoggedInAsync(function(loggedIn) {
					var publicLocation = next.$$route.templateUrl || next.$$route.loadedTemplateUrl;
					if (typeof publicLocation == 'string') {
						publicLocation = ['main.html', 'login.html', 'soeg.html'].indexOf(publicLocation.split('/').splice(-1,1)[0])>0
					} else {
						publicLocation = false
					}
	        if (!publicLocation && !loggedIn) {
	          $location.path('/'); //redirect to frontpage
	        }
				})
			})
		})
  });
  
  
