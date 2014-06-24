/**
 * Gallery item for Trade page
 *
 * @memberof    nyxWebApp
 * @member      TradeeDir
 * @object
 *
 * @author      IlyaVF
 * @date        June 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var TradeeDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-tradee.tpl.html',
                transclude: true,
                scope: {
                    'tradee': '=',
                    'total': '=',
                    'cluster': '=',
                    'callbacks': '='
                },
                link: function (scope) {
                    console.log(scope.tradee.name);
                }
            };
        };

        return TradeeDir;
    });


}(define));
