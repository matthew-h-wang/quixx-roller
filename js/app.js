var app = angular.module('myWebsite',[])
	.config(function($routeProvider){
		$routeProvider
			.when('/about', {template:'partials/about.html'})
			.when('/experience',{template:'partials/experience.html'})
			.otherwise({redirectTo:'/home',template:'partials/home.html'})
	});