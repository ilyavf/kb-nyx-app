/**
 * NyxWebApp - Kooboodle Online Web
 *
 * @namespace nyxWebApp
 * @object
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        //'nyx.auth',
        //'core/authentication/AuthModule',

        'config',

        'auth/AuthModule',
        'home/HomePageModule',
        'pages/mykooboodle/MykooboodleModule',
        'pages/givenget/GivengetModule',
        'pages/settings/SettingsModule',
        'menu/authmain/MenuAuthMainModule',
        'gallery/PhotoGalleryModule',
        'share/ShareModule',
        'lightbox/LightboxModule',

        'controllers/main',
        'controllers/userhome',
        'data/ListData',
        'data/FbData',
        'directives/ActionToolbar',
        'directives/EditableTitle',
        'directives/AjaxButtonDir',
        'directives/ArrowNavigatorDir',
        'directives/ErrorMessageDir'

    ], function (
        cfg, AuthModule, HomePageModule, MyPageModule, GivengetModule, SettingsModule, MenuModule, PhotoGalleryModule, ShareModule, LightboxModule,
         MainCtrl, UserHomeCtrl, ListData, FbData,
         ActionToolbarDir, EditableTitleDir, AjaxButtonDir, ArrowNavigatorDir, ErrorMessageDir
    ) {

        console.log('[app]: configuring app ', cfg);

        var app = angular.module('nyxWebApp', [
            'ngResource',
            'ngRoute',
            'ngFacebook',
            'Nyx.Auth',
            'Nyx.HomePage',
            'Nyx.MyPage',
            'Nyx.GngPage',
            'Nyx.SettingsPage',
            'Nyx.Menu.AuthMain',
            'Nyx.PhotoGallery',
            'Nyx.Share',
            'Nyx.Lightbox'
        ])
        .config(function ($routeProvider) {
            console.log( "[nyxWebApp.RouteManager] Configuring $routeProvider...");
            $routeProvider
                .when('/auth', {
                    templateUrl: 'views/authorized/user_home.html',
                    controller: 'UserHomeCtrl',
                    resolve: {
                        isUserAuthenticated: function (currentUser) {
                            return currentUser.isAuthenticated();
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        })

        // Configure Facebook module:
        .config( function( $facebookProvider ) {
            $facebookProvider.setAppId(cfg.fbAppId);
            $facebookProvider.setCustomInit({
                version    : 'v1.0'
            });
        })
        // Load Facebook SDK:
        .run(function () {
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        })

        .factory('ListData', ListData)
        .factory('FbData', FbData)

        .directive('nxActionToolbar', ActionToolbarDir)
        .directive('nxEditableTitle', EditableTitleDir)
        .directive('nxAjaxButton', AjaxButtonDir)
        .directive('nxArrowNav', ArrowNavigatorDir)
        .directive('nxError', ErrorMessageDir)

        .controller('MainCtrl', MainCtrl)
        .controller('UserHomeCtrl', UserHomeCtrl);

        return app;
    });

} (define, angular));