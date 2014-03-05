/*jshint unused: vars */
require.config({
    baseUrl: './scripts',
    paths: {
    },
    shim: {
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'app'

], function(app) {
    'use strict';

    //console.log('[app-bootstrap]: subscribing to appPromise');
    //appPromise.then(function (app) {
    //});

    /* jshint ignore:start */
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    /* jshint ignore:end */

    console.log('[app-bootstrap]: starting ng app');

    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });
});