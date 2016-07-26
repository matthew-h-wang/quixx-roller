app.controller('HomeController',['$scope','$http',
function($scope,$http) {
	$http.get('http://api.openweathermap.org/data/2.5/forecast/city?id=4930956&APPID=c831e018cf06d3e9faa8291c86bb7d14')
        .success(function(data) {
            $scope.greeting = data;
        });

//        4930956
//        c831e018cf06d3e9faa8291c86bb7d14
//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}
//http://api.openweathermap.org/data/2.5/forecast/city?id=4930956&APPID=c831e018cf06d3e9faa8291c86bb7d14

}]);