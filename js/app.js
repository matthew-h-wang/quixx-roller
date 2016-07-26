var app = angular.module('myWebsite', ['ngRoute'])

app.config(function($routeProvider){
		$routeProvider
			.when('/about', {templateUrl:'partials/about.html'})
			.when('/experience',{templateUrl:'partials/experience.html'})
			.otherwise({redirectTo:'/home',templateUrl:'partials/home.html'})
	});