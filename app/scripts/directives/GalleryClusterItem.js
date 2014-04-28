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
                    'title': '=',
                    'dateRange': '=',
                    'allItems': '=items',
                    'totalCount': '=',
                    'click': '='
                },
                link: function (scope) {
                    scope.url = scope.allItems[0].url;
                    var items = scope.allItems.slice(1,4);
                    while (items.length < 3) {
                        items.push({});
                    }
                    scope.items = items;
                }
            };
        }

        return GalleryClusterItem;
    });


}(define));