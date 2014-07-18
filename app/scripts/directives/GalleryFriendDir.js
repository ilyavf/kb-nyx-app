/**
 * Friend item for Find Friends page
 *
 * @memberof    nyxWebApp
 * @member      FriendDir
 * @object
 *
 * @author      IlyaVF
 * @date        July 16, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var FriendDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-friend.tpl.html',
                transclude: true,
                scope: {
                    'name': '=',
                    'id': '=',
                    'url': '=',
                    'email': '=',
                    'isKooboodle': '=',
                    'isInvited': '='
                },
                link: function (scope) {
                    console.log(scope.name);
                }
            };
        };

        return FriendDir;
    });


}(define));
