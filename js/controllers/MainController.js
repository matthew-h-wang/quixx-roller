app.controller('MainController',['$scope', '$rootScope','$location', '$localStorage', 'shareData',
function($scope, $rootScope, $location, $localStorage, shareData) {
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
	$scope.input.num += 1;

	$scope.updateStorage = function(){
		console.log('updating storage')
		$scope.$storage.input = $scope.input
	};

	notifyInputChange = function(key,value){
		console.log('asking shareData to update and share')
		shareData.updateAndShareInput(key,value)
	};

	$scope.handleNumChange = function(){
		console.log('handling num change ' + $scope.input.num);
		$rootScope.$broadcast('change:num',$scope.input.num)

		// $scope.updateStorage();
		// notifyInputChange('num',$scope.input.num);
	};
	$scope.handleWordChange = function(){
		// console.log('handling word change');
		// $scope.updateStorage();
		// notifyInputChange('word',$scope.input.word);
	};

	$scope.handleNumChange()
	$scope.handleWordChange()

}]);