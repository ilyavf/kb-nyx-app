/*jshint unused: vars */
/**
 * Bootstrap for Nyx angular app
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (window, require, angular) {
    'use strict';

    require.config({
        baseUrl: './scripts',
        //packages: [{
        //    name: 'nyx.auth',
        //    location: 'core/authentication',
        //    main: 'AuthModule'
        //}],
        paths: {
            'auth': 'core/authentication',
            'home': 'pages/homepage'
        }
    });

    //http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/,
        nyxWebDontBootstrap = false;
    // Check if we are not already deferring (by Protractor runner):
    if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
        // defer ng bootstrap:
        window.name = 'NG_DEFER_BOOTSTRAP!';
    } else {
        // don't bootstrap since Protractor will do this for us:
        nyxWebDontBootstrap = true;
    }

    require(['app'], function(app) {

        /* jshint ignore:start */
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        /* jshint ignore:end */


        angular.element().ready(function() {
            if (!nyxWebDontBootstrap) {
                console.log('[app-bootstrap]: starting ng app');
                angular.resumeBootstrap([app.name]);
            }
        });
    });

} (window, require, angular));