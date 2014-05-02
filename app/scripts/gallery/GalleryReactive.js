/**
 * Reactive functionality for gallery (scroll / window resize / mouse selection / etc)
 *
 * @memberof NyxPhotoGallery
 * @member   GalleryRx
 * @object
 *
 * @author      IlyaVF
 * @date        May 2, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        /*

         $(window).scroll( function () {
             if($(window).scrollTop() > $(document).height() - $(window).height() - 200){
                console.log('SCROLL: should load more data');
             }
         });

         */

        var GalleryRx = function ($timeout, $window, $rootScope) {

            $($window).scroll( function () {
                if($($window).scrollTop() > $(document).height() - $($window).height() - 200){
                    console.log('SCROLL: should load more data');
                    $rootScope.$broadcast('doc:end');
                }
            });

            //Rx.Observable.fromEvent(document, 'scroll')

            return {};
        };

        return GalleryRx;
    });

}(define));