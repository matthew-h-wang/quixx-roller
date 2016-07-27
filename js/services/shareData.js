app.factory('shareData',['$rootScope',function($rootScope){
	var share = {};

	share.updateAndShareInput = function(key,value){
		share[key] = value;
		$rootScope.$broadcast('change:' + key,value)
		console.log('broadcasting change:' +key)
	}

	return share
}])