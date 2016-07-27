

app.controller('HomeController',['$scope','pokemon', 'shareData',
function($scope,pokemon,shareData) {

	$scope.num = 0
	$scope.greeting = "Hi. You Should Never See This."

	$scope.updatePokemon = function(id){
		$scope.greeting = "Hold on, updating...";

		pokemon.get({id:id}).$promise.then(function(data) {
      		$scope.greeting = "The name of Pokemon Number " + id + " is " + data.name.toUpperCase() + "!";
    	});
	}


	$scope.update = function(){
		$scope.num = shareData.num;
		$scope.updatePokemon($scope.num);
	}

	$scope.$on('change:num', function(event, data){
		console.log('receiving broadcast');
		$scope.update()
	});	

	$scope.update()



//        4930956
//        c831e018cf06d3e9faa8291c86bb7d14
//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
//https://api.openweathermap.org/data/2.5/forecast/city?id=4930956&APPID=c831e018cf06d3e9faa8291c86bb7d14

}]);