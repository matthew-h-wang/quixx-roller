app.controller('HomeController',['$scope','$rootScope','pokemon', 'shareData',
function($scope,$rootScope,pokemon,shareData) {

	$scope.num = 0
	$scope.greeting = "Hi. You Should Never See This."

	$rootScope.$on('change:num', function(event, data){
		console.log('receiving broadcast');
		$scope.num = data;
		$scope.updatePokemon($scope.num);
	});

	$scope.updatePokemon = function(id){
		$scope.greeting = "Hold on, updating...";

		pokemon.get({id:id}).$promise.then(function(data) {
      		$scope.greeting = "The name of Pokemon Number " + id + " is " + data.name.toUpperCase() + "!";
    	});
	}
	



//        4930956
//        c831e018cf06d3e9faa8291c86bb7d14
//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
//https://api.openweathermap.org/data/2.5/forecast/city?id=4930956&APPID=c831e018cf06d3e9faa8291c86bb7d14

}]);