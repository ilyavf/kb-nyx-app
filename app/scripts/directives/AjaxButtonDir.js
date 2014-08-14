/**
 * Ajax button with 2 states: normal and loading
 *
 * @memberof nyxWebApp
 * @member   AjaxButtonDir
 * @object
 *
 * @author      IlyaVF
 * @date        August 14, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var AjaxButtonDir = function () {
            return {
                restrict: 'E',
                template:
                    '<button ng-click="click()" type="button" class="{{btnClass}} {{state}}">' +
                    '    <span ng-transclude></span>' +
                    '</button>',
                transclude: true,
                scope: {
                    'btnClass': '=',
                    'onClick': '&onClick',
                    'control': '='
                },
                link: function (scope) {
                    scope.state = 'normal';
                    scope.click = function () {
                        if (scope.state === 'loading') return;

                        scope.state = 'loading';
                        scope.onClick();
                    };
                    scope.control.reset = function () {
                        scope.state = 'normal';
                    };
                }
            }
        };

        return AjaxButtonDir;
    });


}(define));