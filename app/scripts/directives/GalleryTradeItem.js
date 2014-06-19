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

        var GalleryTradeItem = function () {
            return {
                restrict: 'E',
                templateUrl: 'views/gallery/gallery-trade-item.tpl.html',
                transclude: true,
                scope: {
                    'trade': '=',
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

        return GalleryTradeItem;
    });


}(define));
