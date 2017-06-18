app.service('RestAPI', [ 'RestAPIFactory', RestAPI ]);
function RestAPI(RestAPIFactory) {
    var restApi = function() {
	this.get = function(url) {
	    return RestAPIFactory.get(url);
	};
    };
    return new restApi();
}
