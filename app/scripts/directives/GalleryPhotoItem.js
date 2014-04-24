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
        var GalleryPhotoItem = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-photo-item.tpl.html',
                //transclude: true,
                scope: {
                    'title': '=title',
                    'url': '=url',
                    'click': '=onClick'
                },
                link: function (scope) {
                }
            };
        }

        return GalleryPhotoItem;
    });


}(define));