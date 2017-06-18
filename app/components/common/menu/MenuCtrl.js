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



