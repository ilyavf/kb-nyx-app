/**
 * Contact page controller
 *
 * @memberof    NyxHomePage
 * @member      ContactCtrl
 * @object
 * @property    {string} pageTitle - Contact
 *
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var HomePageContactCtrl = function ($scope, $rootScope) {
            console.log('[HomePage.ContactCtrl] initializing');

            $scope.pageTitle = 'Contact';

            $rootScope.$broadcast('nav:landed', 'contact');
        };

        return HomePageContactCtrl;
    });

}(define));