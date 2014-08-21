/**
 * Ajax button with 2 states: normal and loading
 *
 * @memberof nyxWebApp
 * @member   ArrowNavigatorDir
 * @object
 *
 * @author      IlyaVF
 * @date        August 21, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var ArrowNavigatorDir = function () {
            return {
                restrict: 'E',
                template:
                    '<a class="arrows" ng-click="prev()"><span class="left">&nbsp;</span></a>' +
                    '    <span class="title">{{currentItem}}</span>' +
                    '<a class="arrows" ng-click="next()"><span class="right">&nbsp;</span></a>',
                transclude: true,
                scope: {
                    'items': '=',
                    'initIndex': '=',
                    'onNext': '&onNext',
                    'onPrev': '&onPrev'
                },
                link: function (scope) {
                    scope.currentIndex = scope.initIndex || 0;
                    scope.currentItem = scope.items[scope.currentIndex];

                    scope.next = function () {
                        if (++scope.currentIndex > scope.items.length-1) scope.currentIndex = scope.items.length-1 ;
                        scope.currentItem = scope.items[scope.currentIndex];
                        scope.onNext(scope.currentItem);
                    };
                    scope.prev = function () {
                        if (--scope.currentIndex < 0) scope.currentIndex = 0;
                        scope.currentItem = scope.items[scope.currentIndex];
                        scope.onPrev(scope.currentItem);
                    };
                }
            }
        };

        return ArrowNavigatorDir;
    });


}(define));