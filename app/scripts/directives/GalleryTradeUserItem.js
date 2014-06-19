/**
 * Gallery item for Trade page
 *
 * @memberof nyxWebApp
 * @member  GalleryPhotoItem
 * @object
 *
 * @author      IlyaVF
 * @date        June 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var GalleryTradeUserItem = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-trade-user-item.tpl.html',
                transclude: true,
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

        return GalleryTradeUserItem;
    });


}(define));
