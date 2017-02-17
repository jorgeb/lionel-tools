(function () {
  'use strict';

  angular.module('spread2TS')
    .factory('spreadMapService', function () {

      return {
        getColumnsFromSpread: function (spreadId) {

          return Rx.Observable.create(function (observer){
            // Yield a single value and complete
            var retFromSvr = function (data) {
              observer.onNext(data);
              observer.onCompleted();
            };

            google.script.run
              .withSuccessHandler(retFromSvr)
              .getSpreadColumns(spreadId);

            return function () {
                console.log('disposed');
            };
          });
        }
      };
    });

})();