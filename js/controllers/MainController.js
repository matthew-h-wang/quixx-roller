app.controller('MainController',['$scope','$location', '$localStorage', 'shareData',
function($scope, $location, $localStorage, shareData) {
	$scope.setRoute = function(route) {
		$location.path(route);
	}


	$scope.$storage = $localStorage.$default({
          	num: 0,
          	word: 'Hello'
        });

	$scope.input = {num: $localStorage.num + 1,word:$localStorage.word}

	$scope.updateStorage = function(){
		console.log('updating storage');
		$scope.$storage.num = $scope.input.num;
		$scope.$storage.word = $scope.input.word

	};

	notifyInputChange = function(key,value){
		console.log('asking shareData to update and share')
		shareData.updateAndShareInput(key,value)
	};

	$scope.handleNumChange = function(){
		console.log('handling num change ' + $scope.input.num);
		$scope.updateStorage();
		notifyInputChange('num',$scope.input.num);
	};
	$scope.handleWordChange = function(){
		console.log('handling word change');
		$scope.updateStorage();
		notifyInputChange('word',$scope.input.word);
	};

	$scope.handleNumChange()
	$scope.handleWordChange()

}]);