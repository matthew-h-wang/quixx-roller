var app = angular.module('myWebsite', ['ngRoute','ngResource','ngStorage']);

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
			.when('/howard-is-hungry',{
				// controller: 'ExperienceController',
				templateUrl:'howard_is_hungry/howard_is_hungry.html'
			})
			.otherwise({
				redirectTo:'/'
			});
	});