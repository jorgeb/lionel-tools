(function () {
    'use strict';

    angular.module('spread2TS')
        .factory('typescriptBuilderService', function () {

            return {
                getTypes: ['boolean', 'number', 'string', 'Date']
            };
        });

})();