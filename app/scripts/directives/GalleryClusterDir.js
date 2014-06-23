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
        var GalleryClusterDir = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-cluster.tpl.html',
                scope: {
                    'cluster': '=',
                    'click': '=onClick',
                    'dblclick': '=onDblClick'
                },
                link: function (scope) {
                    var cover = scope.cluster.items[0];
                    scope.url = cover.url;
                    scope.title = scope.cluster.title;
                    scope.id = scope.cluster.id;
                    scope.dashedTitle = scope.cluster.dashedTitle;
                    scope.dateFrom = scope.cluster.dateFrom;
                    scope.dateTo = scope.cluster.dateTo;
                    scope.totalCount = scope.cluster.totalCount;
                    var items = scope.cluster.items.slice(1, 5);
                    while (items.length < 4) {
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
                    scope.updateTitle = function (cluster) {
                        console.log('[updateTitle] ' + cluster.title);
                        cluster.sync(cluster);
                    };
                }
            };
        }

        return GalleryClusterDir;
    });


}(define));