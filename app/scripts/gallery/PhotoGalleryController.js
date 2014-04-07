/**
 * Contact page controller
 *
 * @memberof    NyxPhotoGallery
 * @member      Ctrl
 * @object
 *
 * @author      IlyaVF
 * @date        April 7, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var PhotoGalleryCtrl = function ($scope, $rootScope) {
            console.log('[PhotoGallery.Ctrl] initializing');

            $scope.pageTitle = 'Photo Gallery';

            $scope.items = getItems();

        };

        return PhotoGalleryCtrl;
    });

}(define));


function getItems () {
    return [{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    },{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201310/Chess-art-9-49a88b_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        }]
    },{
        id: 1,
        title: 'Summer',
        dateRange: {
            start: new Date('2010-06-02'),
            end: new Date('2012-08-10')
        },
        totalCount: 3,
        subItems: [{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131207_162511-666764_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 0,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        }]
    }];
}