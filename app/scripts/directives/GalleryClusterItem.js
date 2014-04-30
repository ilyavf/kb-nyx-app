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
                templateUrl: 'views/gallery/gallery-cluster-item.tpl.html',
                //transclude: true,
                scope: {
                    'title': '=',
                    'dateRange': '=',
                    'allItems': '=items',
                    'totalCount': '=',
                    'click': '='
                },
                link: function (scope) {
                    var cover = scope.allItems[0];
                    scope.url = cover.url;
                    var items = scope.allItems.slice(1,4);
                    while (items.length < 3) {
                        items.push({});
                    }
                    scope.items = items;
                    scope.preview = function (item) {
                        if (item.url) {
                            items.splice(items.indexOf(item), 1, cover);
                            cover = item;
                            scope.url = cover.url;
                        }
                    };
                }
            };
        }

        return GalleryClusterItem;
    });


}(define));