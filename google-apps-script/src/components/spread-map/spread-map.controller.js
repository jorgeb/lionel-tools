(function () {
  'use strict';
  console.log(' spreadMapController');
  angular.module('spread2TS')
      .controller('spreadMapController', function (spreadMapService) {
        var dd = this;
          
        spreadMapService.getColumnsFromSpread('1-4bmqP7mIVegdCd-aHeFI0ZfZ9xmfwnrK7yG0YC4TIY')
            .subscribe(function (columns) {
              console.log(columns);
        });

        dd.vMM = "Otro vez! JAV";
      });
})();
