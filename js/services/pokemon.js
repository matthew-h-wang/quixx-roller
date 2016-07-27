app.factory('pokemon',['$resource',function($resource){
	return $resource('https://pokeapi.co/api/v2/pokemon/:id/')
}])