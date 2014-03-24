/**
 * Auth main menu module - angular module Nyx.Menu.AuthMain.
 *
 * @namespace   NyxMenuAuthMain
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define, angular) {
    'use strict';

    define(['./MenuAuthMainController'], function (MainCtrl) {

        var moduleName = "Nyx.Menu.AuthMain";

        angular
            .module(moduleName, [])
            .controller("Nyx.Menu.AuthMain.Ctrl", MainCtrl);

        return moduleName;
    });

}(define, angular));