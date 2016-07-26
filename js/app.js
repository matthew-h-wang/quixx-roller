var app = angular.module('myWebsite', ['ngRoute']);

app.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl:'partials/home.html'
			})
			.when('/about', {
				templateUrl:'partials/about.html'
			})
			.when('/experience',{
				templateUrl:'partials/experience.html'
			})
			.otherwise({
				redirectTo:'/'
			});
	});