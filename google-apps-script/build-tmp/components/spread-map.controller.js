(function () {
  'use strict';
  console.log(' spreadMapController');
  angular.module('spread2TS')
      .controller('spreadMapController', function ($scope,tableMapService) {
        var sm = this;

        tableMapService.getTable('1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3')
            .subscribe(function (table) {
                $scope.columns = table.columns.map(function (c) {

                    c.MapName = c.name;
                    c.Append = true;

                    return c;
                });

                $scope.$applyAsync();
        });

        $scope.vMM = "Otro vez! JAV";
      });
})();
