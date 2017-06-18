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
