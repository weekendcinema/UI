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