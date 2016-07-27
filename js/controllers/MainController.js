app.controller('MainController',['$scope', '$location',
function($scope, $location) {
	$scope.setRoute = function(route) {
		$location.path(route);
	}

	$scope.input = {
		num: '1',
		word: 'Hello'
	}
	
}]);