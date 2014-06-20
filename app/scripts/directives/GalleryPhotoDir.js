/**
 * Gallery item simple
 *
 * @memberof nyxWebApp
 * @member  GalleryPhotoItem
 * @object
 *
 * @author      IlyaVF
 * @date        April 17, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        // Require $route service since there is no ng-view initially on the index page.
        var GalleryPhotoDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-photo.tpl.html',
                //transclude: true,
                scope: {
                    'item': '=',
                    'title': '=',
                    'url': '=',
                    'date': '=',
                    'total': '=',
                    'click': '=onClick',
                    'dblclick': '=onDblClick'
                },
                link: function (scope) {
                }
            };
        }

        return GalleryPhotoDir;
    });


}(define));