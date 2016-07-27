app.factory('shareData',['$rootScope',function($rootScope){
	var share = {};

	share.updateAndShareInput = function(key,value){
		share[key] = value;
		$rootScope.$broadcast('change:' + key,value)
	}

	return share
}])