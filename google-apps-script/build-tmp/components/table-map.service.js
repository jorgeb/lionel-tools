(function () {
    'use strict';

    angular.module('spread2TS')
        .factory('tableMapService', function () {

            return {
                getTable: function (tableId) {

                    return Rx.Observable.create(function (observer) {
                        // Yield a single value and complete
                        var retFromSvr = function (data) {

                            observer.onNext(data);
                            observer.onCompleted();
                        };

                        google.script.run
                            .withSuccessHandler(retFromSvr)
                            .getTable(tableId);

                        return function () {
                            console.log('disposed');
                        };
                    });
                }
            };
        });

})();