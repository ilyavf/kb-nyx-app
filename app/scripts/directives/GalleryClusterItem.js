/**
 * Gallery item simple
 *
 * @memberof nyxWebApp
 * @member  GalleryClusterItem
 * @object
 *
 * @author      IlyaVF
 * @date        April 17, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        // Require $route service since there is no ng-view initially on the index page.
        var GalleryClusterItem = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-cluster-item.html',
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

        return GalleryClusterItem;
    });


}(define));