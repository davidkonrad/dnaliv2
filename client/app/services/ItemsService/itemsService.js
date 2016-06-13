angular.module('dnalivApp')
  .factory('ItemsService', ['$cookies', function($cookies) {
		var cookieName = 'items'
		return {
			get: function(defaults) {
				console.log($cookies.get(cookieName))
				return $cookies.get(cookieName).split(',') || defaults
			},
			put: function(items) {
				var expireDate = new Date()
				expireDate.setDate(expireDate.getDate() + 1);
				$cookies.put(cookieName, items.join(','), { expires: expireDate } )
			}
		}
}]);
