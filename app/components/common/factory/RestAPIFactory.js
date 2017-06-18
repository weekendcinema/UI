app.service('RestAPIFactory', [ '$http', function($http) {

	var get = function(url) {
		var GET = $http({
			method : 'GET',
			url : url
		});
		return GET;
	};
	return {
		get : get
	};
} ]);