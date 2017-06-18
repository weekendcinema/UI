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
