/**
 * Action Toolbar directive
 *
 * @memberof    nyxWebApp
 * @member      ActionToolbar
 * @object
 *
 * @author      IlyaVF
 * @date        May 22, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var ActionToolbarDir = function () {

            console.log('DIRECTIVE ActionToolbarDir.init');

            return {
                restrict: 'E',
                templateUrl: 'views/toolbars/action.tpl.html',
                transclude: true,
                scope: {
                    'configStr': '=config'
                },
                link: function (scope, element, attrs) {
                    scope.$emit('action-toolbar:ready');
                    console.log('DIRECTIVE ActionToolbarDir.link');
                    scope.$on('action-toolbar:selectedTotal', function (e, total) {
                        scope.selectedFromTotal = total;
                        console.log('ON EVENT action-toolbar:selectedTotal ' + total, arguments );
                    });
                    scope.$on('action-toolbar:selected', function (selected) {
                        scope.selectedMnt = selected;
                    });

                    var config = scope.configStr.split(',').map(function(i){ return 'is' + i[0].toUpperCase() + i.slice(1,i.length) + 'Visible';});
                    config.forEach(function (i) { scope[i] = true; });
                    scope.shareAction = function () {
                      //$rootScope.$broadcast('action-toolbar:share');
                    };
                }
            };
        }

        return ActionToolbarDir;
    });


}(define));