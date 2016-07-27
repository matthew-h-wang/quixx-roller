app.controller('MainController',['$scope', '$location', '$localStorage', 'shareData',
function($scope, $location, $localStorage, shareData) {
	$scope.setRoute = function(route) {
		$location.path(route);
	}


	$scope.$storage = $localStorage.$default({
          input : {
          	num: 0,
          	word: 'Hello'
          }
        });

	$scope.input = $localStorage.input;
	$scope.input.num += 1

	$scope.updateStorage = function(){
		$scope.$storage.input = $scope.input
	};

	notifyInputChange = function(key,value){
		shareData.updateAndShareInput(key,value)
	};

	$scope.handleNumChange = function(){
		$scope.updateStorage()
		notifyInputChange('num',$scope.input.num)
	};
	$scope.handleWordChange = function(){
		$scope.updateStorage()
		notifyInputChange('word',$scope.input.word)
	};

	$scope.handleNumChange()
	$scope.handleWordChange()

}]);