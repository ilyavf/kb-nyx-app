/**
 * Editable title
 *
 * @memberof nyxWebApp
 * @member   EditableTitle
 * @object
 *
 * @author      IlyaVF
 * @date        May 28, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        // Require $route service since there is no ng-view initially on the index page.
        var EditableTitleDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/components/editable_title.tpl.html',
                transclude: true,
                scope: {
                    'item': '='
                },
                link: function (scope) {
                    scope.isInputVisible = false;
                    scope.onInput = function (e) {
                        console.log('onInput: ' + e.keyCode);
                        if (e.keyCode == 13) {
                            scope.isInputVisible = false;
                            scope.titleOrig = '';
                        }
                        if (e.keyCode == 27) {
                            scope.cancelInput();
                        }
                    };
                    scope.startInput = function (e) {
                        scope.titleOrig = scope.item.title;
                        scope.isInputVisible = true;

                        setTimeout(function () {
                            $(e.target).parent().find('input').focus();
                        }, 0);
                    };
                    scope.cancelInput = function () {
                        console.log('cancelInput: scope.titleOrig = ' + scope.titleOrig);
                        if (scope.titleOrig) {
                            scope.item.title = scope.titleOrig;
                            scope.isInputVisible = false;
                        }
                    };
                }
            };
        }

        return EditableTitleDir;
    });


}(define));