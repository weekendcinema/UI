function CinemaCtrl($scope, $http, $stateParams, constants) {
	$scope.cinemaName = $stateParams.cinemaName;
	$scope.isLoading = true;
	$scope.found = true;
	var GET = $http.get(constants.api.url + '/cinema/' + $stateParams.cinemaName);
	GET.success(function(response) {
		$scope.cinema = response || null;
		$scope.currentSong = $scope.cinema.songs.list ? $scope.cinema.songs.list[0].youtubeUrl:undefined;
		$scope.isLoading = false;
	});
	GET.error(function() {
		$scope.cinema = null;
		$scope.isLoading = false;
	});
	
}

app.controller('CinemaCtrl', [ '$scope', '$http', '$stateParams', 'constants',CinemaCtrl ]);

