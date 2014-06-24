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

        var ThumbsPreviewDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/components/thumbs-preview.tpl.html',
                transclude: true,
                scope: {
                    'items': '=',
                    'total': '=',
                    'shown': '='
                },
                link: function (scope) {
                    scope.thumbs = (scope.items || []).slice(0, scope.shown || 3);
                }
            };
        }

        return ThumbsPreviewDir;
    });


}(define));
