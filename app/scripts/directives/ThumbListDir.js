/**
 * Thumbs preview for Trade page
 *
 * @memberof    nyxWebApp
 * @member      ThumbsDir
 * @object
 *
 * @author      IlyaVF
 * @date        June 24, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var ThumbListDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/components/thumblist.tpl.html',
                transclude: true,
                scope: {
                    'items': '=',
                    'shown': '='
                },
                link: function (scope) {
                    var items = [];
                    for (var i = 0; i<4; i++) {
                        items.push({ url: scope.items[i] || ''});
                    }
                    console.log('ThumbListDir', items);
                    scope.thumbs = items;
                }
            };
        };

        return ThumbListDir;
    });


}(define));
