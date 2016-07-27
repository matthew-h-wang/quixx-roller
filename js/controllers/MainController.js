app.controller('MainController',['$scope', '$location', '$localStorage',
function($scope, $location, $localStorage) {
	$scope.setRoute = function(route) {
		$location.path(route);
	}


	$scope.$storage = $localStorage.$default({
          input : {
          	num: 1,
          	word: 'Hello'
          }
        });

	$scope.input = $localStorage.input;
	$scope.input.num += 1
	$scope.updateStorage = function(){
		$scope.$storage.input = $scope.input
	};

}]);