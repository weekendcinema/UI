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