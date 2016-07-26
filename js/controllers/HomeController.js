app.controller('HomeController',['$scope','$http',
function($scope,$http) {
	$http.get('https://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        });
}]);