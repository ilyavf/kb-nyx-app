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
                    'configStr': '=config',
                    'openSignInModal': '='
                },
                link: function (scope, element, attrs) {
                    scope.$emit('action-toolbar:ready');
                    console.log('DIRECTIVE ActionToolbarDir.link');

                    scope.configVisibleProps = [
                        'logo',
                        'back',
                        'view',
                        'title',
                        'sort',
                        'share',
                        'select',
                        'send',
                        'cancel',
                        'refresh',
                        'help',
                        'logout',
                        'mainActionTitle'
                    ];
                    scope.configure = function (configOpts) {
                        scope.configVisibleProps.forEach(function (prop) {
                            scope[prop + 'Visible'] = configOpts && !configOpts.join && configOpts[prop]
                                || configOpts && configOpts.join && configOpts.indexOf(prop) !== -1
                                || false;
                        });
                    };

                    var configArr = scope.configStr.split(',').map(function(i){ return i + 'Visible'; });
                    scope.configure(configArr);


                    scope.$on('action-toolbar:selectedTotal', function (e, total) {
                        scope.selectedFromTotal = total;
                        console.log('ON EVENT action-toolbar:selectedTotal ' + total, arguments );
                    });
                    scope.$on('action-toolbar:selected', function (event, selected) {
                        scope.selectedMnt = selected;
                    });
                    scope.$on('action-toolbar:config', function (event, config) {
                        scope.configure(config);
                    });

                    scope.shareAction = function () {
                      //$rootScope.$broadcast('action-toolbar:share');
                    };
                    scope.goBack = function (levels) {
                        levels = levels || 1;
                        scope.$emit('action-toolbar:goBack', levels);
                    };
                    scope.view = function () {
                        if (scope.selectedMnt == 1) {
                            scope.$emit('broadcast', 'action-toolbar:view');
                        }
                    };
                    scope.selectAll = function () {
                        scope.$emit('broadcast', 'action-toolbar:selectAll');
                    };
                    scope.deselectAll = function () {
                        scope.$emit('broadcast', 'action-toolbar:deselectAll');
                    };
                    scope.logout = function () {
                        scope.$emit('user:dologout');
                    };
                    scope.btnClick = function (action) {
                        scope.$emit('broadcast', 'action-toolbar:' + action);
                    }
                }
            };
        }

        return ActionToolbarDir;
    });


}(define));