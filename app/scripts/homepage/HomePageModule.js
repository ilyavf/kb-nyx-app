/**
 * Home page module - angular module Nyx.HomePage.
 * This module serves home page navigation routes (e.g. /home, /about, /contact).
 *
 * @namespace   NyxHomePage
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        //'auth/AuthModule',
        './HomePageRoutes',
        './HomeController',
        './AboutController',
        './ContactController'
    ],
    function (Routes, HomeCtrl, AboutCtrl, ContactCtrl) {
        var moduleName = "Nyx.HomePage";

        angular
            .module(moduleName, ['ngRoute'])
            .config(Routes)
            .controller("HomePage.HomeCtrl", HomeCtrl)
            .controller("HomePage.AboutCtrl", AboutCtrl)
            .controller("HomePage.ContactCtrl", ContactCtrl);

        return moduleName;
    });

}(define, angular));