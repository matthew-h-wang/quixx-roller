var app = angular.module('myWebsite', ['ngRoute']);

app.config(function($routeProvider){
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				templateUrl:'partials/home.html'
			})
			.when('/about', {
				// controller: 'AboutController',
				templateUrl:'partials/about.html'
			})
			.when('/experience',{
				// controller: 'ExperienceController',
				templateUrl:'partials/experience.html'
			})
			.otherwise({
				redirectTo:'/'
			});
	});