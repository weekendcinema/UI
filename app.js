var app = angular.module("WcApp", ['ui.router', 'ui.calendar']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/components/home/Home.html',
    controller: 'HomeCtrl'
  }).state('post', {
    url: '/post/:postName',
    templateUrl: 'app/components/post/Post.html',
    controller: 'PostCtrl'
  }).state('cinemas', {
    url: '/cinemas',
    templateUrl: 'app/components/cinema/CinemaHome.html',
    controller: 'CinemaHomeCtrl'
  }).state('cinema', {
    url: '/cinema/:cinemaName',
    templateUrl: 'app/components/cinema/Cinema.html',
    controller: 'CinemaCtrl'
  }).state('celebrities', {
    url: '/celebrities',
    templateUrl: 'app/components/celebrity/CelebrityHome.html',
    controller: 'CelebrityHomeCtrl'
  }).state('celebrity', {
    url: '/celebrity/:celebrityName',
    templateUrl: 'app/components/celebrity/Celebrity.html',
    controller: 'CelebrityCtrl'
  }).state('calendar', {
    url: '/calendar',
    templateUrl: 'app/components/calendar/CalendarHome.html',
    controller: 'CalendarHomeCtrl'
  });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
});

app.constant('constants', {
  api: {
    url: 'https://wcinemaapi.herokuapp.com/v1'
  }
});
function CalendarHomeCtrl($scope, $http,$compile, uiCalendarConfig, DateUtil) {

  $scope.eventRender = function( event, element, view ) { 
      element.attr({'tooltip': event.title,
                   'tooltip-append-to-body': true});
      $compile(element)($scope);
  };
  /* configuration object */
  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: true,
      header: {
        right: 'today,prev,next',
        left: '',
        center: 'title'
      },
      eventRender: $scope.eventRender
    }
  };
  var date = new Date();
  /* event source that contains custom events on the scope */
  $scope.events = {
    events: [{
      title: "Bahubali 2 official trailer",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-03-16')),
      url: "/cinema/Bahubali2",
      className:"fa fa-music color-VIDEO"
    }, {
      title: "Om Namo venkatesaya",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-02-10')),
      url: "/post/tikka-teaser-1",
      className:"fa fa-film color-mediumseagreen" 
    }, {
      title: "Singam 3",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-02-09')),
      url: "/post/tikka-teaser-1"
    }, {
      title: "Ghazi",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-02-17')),
      url: "/post/tikka-teaser-1"
    }, {
      title: "Raarandoi Veduka Choodham",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-05-18')),
      url: "/cinema/",
      className:"fa fa-music color-MUSIC"
    }, {
      title: "Katamarayudu teaser",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-02-04')),
      url: "https://www.youtube.com/watch?v=XpAaOER_6iY",
      className:"fa fa-video-camera color-NEWS"
    },
    {
      title: "Sample Video",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-05-18')),
      url: "/cinema/",
      className:"fa fa-video-camera color-VIDEO"
    }, {
      title: "Vijay Devarakonda",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-05-08')),
      url: "/celebrity",
      className:"fa fa-birthday-cake color-BIRTHDAY"
    },{
      title: "Sample",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-05-18')),
      url: "/celebrity",
      className:"fa fa-birthday-cake color-BIRTHDAY"
    }, {
      title: "Sample cinema",
      start: DateUtil.toYYYY_MM_DD(new Date('2017-05-18')),
      url: "/post/tikka-teaser-1",
      className:"fa fa-film color-mediumseagreen" 
    }]
  };

  /* event sources array */
  $scope.eventSources = [$scope.events];
}

app.controller('CalendarHomeCtrl', ['$scope', '$http','$compile','uiCalendarConfig',
    'DateUtil', CalendarHomeCtrl]);

app.controller('CelebrityCtrl',['$scope',CelebrityCtrl]);

function CelebrityCtrl($scope) 
{ 
	$scope.message = "Welcome to Celebrity page";
}

function CelebrityHomeCtrl($scope, $http) {
}

app.controller('CelebrityHomeCtrl', [ '$scope', '$http',CelebrityHomeCtrl ]);


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


function CinemaHomeCtrl($scope, $http,$state) {

}

app.controller('CinemaHomeCtrl', [ '$scope', '$http','$state',CinemaHomeCtrl ]);


function BodyDirective() {
  return {
    restrict: 'E',
    templateUrl: "app/components/common/body/Body.html"
  };
}
app.directive('wcbody', [BodyDirective]);
function And($sce) {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    replace: true,
    link: function(scope, elm) {
      scope.$watch('list', function(newList) {
        if (newList) {
          if(newList.length>=2){
            var copy = angular.copy(newList);
            var lastElm = copy.pop();
            elm.text(copy.join().concat(" and ").concat(lastElm));
          }
          else{
            elm.text(newList.join());
          }
        }
      });
  }
}
}

app.directive('and', ['$sce', And]);
app.directive("owlCarousel", function() {
    return {
      restrict: 'E',
      transclude: false,
      link: function(scope) {
        scope.initCarousel = function(element) {
          var defaultOptions = {autoplay:true,rewind:true,dots:true,nav:true,responsive: {
            0: {
              items: 2
            },
            300: {
              items: 3
            },
            400:{
              items: 4
            },
            1000: {
              items: 10
            }
          }};
          var customOptions = scope.$eval($(element).attr('data-options'));
          for ( var key in customOptions) {
            defaultOptions[key] = customOptions[key];
          }
          $(element).owlCarousel(defaultOptions);
        };
      }
    };
  }).directive('owlCarouselItem', [function() {
    return {
      restrict: 'E',
      transclude: false,
      link: function(scope, element) {
        if (scope.$last) {
          scope.initCarousel(element.parent());
        }
      }
    };
  }]);

app.directive('spinner', [function() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      templateUrl:'app/components/common/directives/spinner/spinner.html',
      link: function(scope, element) {
        $(element).modal('show');
        $("#myModal").modal('show');
        scope.$watch('show', function(newVal) {
          if (newVal) {
            $(element).modal('hide');
            $("#myModal").modal('hide');
          }
        });
      }
    };
}]);
app.directive('myCurrentTime', ['$interval', function($interval) {
  // return the directive link function. (compile function not needed)
  return function(scope, element, attrs) {
    var // date format
    stopTime; // so that we can cancel the time updates

    // used to update the UI
    function updateTime() {
      element.text(new Date());
    }

    stopTime = $interval(updateTime, 1000);

    // listen on DOM destroy (removal) event, and cancel the next UI update
    // to prevent updating time after the DOM element was removed.
    element.on('$destroy', function() {
      $interval.cancel(stopTime);
    });
  };
}]);
function DateTime() {
  return {
    restrict: 'E',
    scope: {
      date: '=date',
      format: '=format'
    },
    replace: true,
    link: function(scope, elm) {
      function formatDate(elm,date,format){
        if(format || date)
          return;
        switch (format) {
        case 'YYYY':
          elm.text(date.getFullYear());
          break;
        }
      }
      scope.$watch('date', function(newVal) {
        if (newVal) {
          var time =  new Date(newVal);
          formatDate(elm,time,scope.format);
        }
      });
      scope.$watch('format', function(newVal) {
        if (newVal) {
          var format =  newVal;
          formatDate(elm,scope.time,format);
        }
      });
    }
  };
}

app.directive('dateTime', ['$sce', DateTime]);
function TimeDiff($sce) {
  return {
    restrict: 'E',
    scope: {
      date: '='
    },
    templateUrl: '',
    replace: true,
    link: function(scope, elm) {
      scope.$watch('date', function(newVal) {
        if (newVal) {
          var startDate = new Date();
          var endDate = new Date(newVal);
          var timeStart = startDate.getTime();
          var timeEnd = endDate.getTime();
          var diffMs = (timeStart - timeEnd);
          var diffYears = Math.abs(Math.round((diffMs/(60 * 60 * 24))/365.25));
          var diffMonths = monthDiff(endDate,startDate)
          var diffDays = Math.floor(diffMs / 86400000); // days
          var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
          var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
          if (diffMonths > 0) {
            elm.text(diffMonths + ' months')
          } else if (diffDays > 0) {
            elm.text(diffDays + ' days');
          } else if (diffHrs > 0) {
            elm.text(diffHrs + ' hours');
          } else if (diffMins > 0) {
            elm.text(diffMins + ' min');
          } else {
            elm.text((diffMs / 1000) + ' sec');
          }
        }
        function monthDiff(d1, d2) {
          var months;
          months = (d2.getFullYear() - d1.getFullYear()) * 12;
          months -= d1.getMonth() + 1;
          months += d2.getMonth();
          return months <= 0 ? 0 : months;
        }
      });
    }
  };
}

app.directive('timeDiff', ['$sce', TimeDiff]);
app.directive('twitter', [ '$sce', TwitterDirective ]);

function TwitterDirective($sce) {
	return {
		restrict : 'A',
		templateUrl : 'app/components/common/directives/twitter/Twitter_directive.html',
		link :  {
			post : function(scope,ele,attr){
				console.log(attr);
			}
		}
	}
};

app.directive('myYoutube', ['$sce', YoutubeDirective]);

function YoutubeDirective($sce) {
  return {
    restrict: 'E',
    scope: {
      code: '='
    },
    replace: true,
    templateUrl: 'app/components/common/directives/youtube/Youtube.html',
    link: function(scope) {
      scope.$watch('code', function(newVal) {
        if (newVal) {
          scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + newVal);
        }
      });
    }
  };
}

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
function MenuCtrl($scope,$rootScope,$location,$state,$stateParams) 
{ 
    var me = $scope;
    me.language = "English";
    $rootScope.language = "English";
    me.ttl="వీకెండ్ ";
    me.cinema = "సినిమా";
    me.celebrity ="సెలబ్రిటీ";
    me.calendar ="కేలండర్";
    me.changeLanguage = function(){
      if( me.language == "English" ){
        me.language = "తెలుగు";
        me.ttl= "Weekend"
        me.cinema = "Cinema";
        me.celebrity ="Celebrity";
        me.calendar ="Calendar";
      }else{
        me.language = "English";
        me.ttl="వీకెండ్";
        me.cinema = "సినిమా";
        me.celebrity ="సెలబ్రిటీ";
        me.calendar ="కేలండర్";
      }
      $state.transitionTo('home');
    }
    me.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}

app.controller('MenuCtrl',['$scope','$rootScope','$location','$state','$stateParams',MenuCtrl]);




app.service('DateUtil',[function(){
	var DateUtil = function(){
		this.toYYYY_MM_DD = function(date){
			return date.toISOString().split('T')[0];
		};
	};
	return new DateUtil();
}]);
app.service('RestAPI', [ 'RestAPIFactory', RestAPI ]);
function RestAPI(RestAPIFactory) {
    var restApi = function() {
	this.get = function(url) {
	    return RestAPIFactory.get(url);
	};
    };
    return new restApi();
}

app.constant('Endpoints', {
    
});
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

function PostCtrl($scope, $http, $stateParams, constants,$window) {
	$scope.found = true;
	$scope.isLoading = true;
	if($scope.$parent.posts && $scope.$parent.posts.length>0){
		$scope.$parent.posts.forEach(function (item, index) {
			if(item._id === $stateParams.postName){
				$scope.article = item;
				$scope.isLoading = false;
			}
		});
	}else{
		var GET = $http({
			method : 'GET',
			url : constants.api.url + '/post/' + $stateParams.postName
		});	
		GET.success(function(response) {
			$scope.article = response ? response : null;
			$scope.found = true;
			$scope.isLoading = false;
		});
		GET.error(function() {
			$scope.article = null;
			$scope.found = false;
			$scope.isLoading = false;
		});
	}
	$window.scrollTo(0, 0);
}

app.controller('PostCtrl',['$scope','$http', '$stateParams', 'constants','$window',PostCtrl]);