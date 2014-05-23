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
             if ($(window).scrollTop() > $(document).height() - $(window).height() - 200){
                console.log('SCROLL: should load more data');
                $rootScope.$broadcast('doc:end');
             }
         });

         */

        var GalleryRx = function ($timeout, $window, $rootScope) {

            Rx.Observable
                .merge(
                    Rx.Observable.fromEvent(document, 'scroll'),
                    Rx.Observable.fromEvent($window, 'resize')
                )
                .throttle(100)
                .map(function (e) {
                    return $($window).scrollTop();
                })
                .subscribe(function (scrollTop) {
                    if (scrollTop > $(document).height() - $($window).height() - 600) {
                        console.log('SCROLL: should load more data');
                        $rootScope.$broadcast('doc:end');
                    }
                });

            return {};
        };

        return GalleryRx;
    });

}(define));