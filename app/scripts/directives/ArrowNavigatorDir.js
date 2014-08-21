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
                    '<a class="arrows" ng-click="prev()"><span class="left {{leftDisabled}}">&nbsp;</span></a>' +
                    '    <span class="title">{{currentItem}}</span>' +
                    '<a class="arrows" ng-click="next()"><span class="right {{rightDisabled}}">&nbsp;</span></a>',
                transclude: true,
                scope: {
                    'items': '=',
                    'initIndex': '=',
                    'onNext': '=',
                    'onPrev': '=',
                    'control': '='
                },
                link: function (scope) {
                    scope.currentIndex = scope.initIndex || 0;
                    scope.currentItem = scope.items[scope.currentIndex];

                    scope.leftDisabled = scope.rightDisabled = 'disabled';

                    scope.next = function () {
                        if (++scope.currentIndex > scope.items.length-1) {
                            scope.currentIndex = scope.items.length-1 ;
                        } else {
                            scope.currentItem = scope.items[scope.currentIndex];
                            scope.onNext(scope.currentItem);
                        }
                        scope.checkArrows(scope.items.length, scope.currentIndex);
                    };
                    scope.prev = function () {
                        if (--scope.currentIndex < 0) {
                            scope.currentIndex = 0;
                        } else {
                            scope.currentItem = scope.items[scope.currentIndex];
                            scope.onPrev(scope.currentItem);
                        }
                        scope.checkArrows(scope.items.length, scope.currentIndex);
                    };
                    scope.control.setItems = function (items, index) {
                        scope.items = items;
                        scope.currentIndex = index || 0;
                        scope.currentItem = scope.items[scope.currentIndex];
                        scope.checkArrows(items.length, index);
                    };
                    scope.checkArrows = function (itemsTotal, index) {
                        scope.rightDisabled = index < itemsTotal-1 ? '' : 'disabled';
                        scope.leftDisabled = index > 0 ? '' : 'disabled';
                    };
                }
            }
        };

        return ArrowNavigatorDir;
    });


}(define));