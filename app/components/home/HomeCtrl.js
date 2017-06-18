function HomeCtrl($scope,$rootScope,RestAPI, $window, constants, $interval) {
  var me = $scope;
  me.videos = [];
  me.posts = [];
  me.isLoading = true;
  me.loaderTotalCount = 1;
  me.loaderCount = 0;
  me.language = $rootScope.language;

  var GET = RestAPI.get(constants.api.url + '/posts');
  GET.success(function(response) {
    me.posts = response ? response : [];
    me.posts.forEach(function(post,index,array){
      if (['TEASER', 'TRAILER'].indexOf(post.type) != -1) {
        me.videos.push(post);
      }
    });
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.posts = [];
  });
  
  var GET = RestAPI.get(constants.api.url + '/cinemas');
  GET.success(function(response) {
    me.upcomingCinemas = response.upcomingCinemas ? response.upcomingCinemas : [];
    me.showOrHideLoader();
  });
  GET.error(function() {
    me.upcomingCinemas = [];
  });

  me.showPost = function(post) {
    $window.location.href = "/post/" + post._id;
  };

  me.showTrendingCinema = function(cinema) {
    $window.location.href = "/cinema/" + cinema._id;
  };

  me.scrollToTop = function() {
    $window.scrollTo(0, 0);
  };
  me.showOrHideLoader = function(){
    me.loaderCount ++;
    if( me.loaderTotalCount == me.loaderCount ){
      me.isLoading = false;
    }
  }
}

app.controller('HomeCtrl', ['$scope','$rootScope','RestAPI', '$window', 'constants',
    HomeCtrl]);
