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