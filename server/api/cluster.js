var request = require('request'),
    Q = require('q');


var clusterList = function (req, res) {
//    console.log(timestamp() + 'module cluster.list');
//    var url = 'http://uat.kooboodle.com/albums/list.json';
//    req.pipe(request(url)).pipe(res);

    res.json({
        success: true,
        result: getItems()
    });
};


module.exports = {
    list: clusterList
};




function timestamp () {
    return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
}


function getItems () {
    return [{
        id: 0,
        title: 'Pictures',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 5,
        subItems: [{
            id: 0,
            url: 'http://uat.kooboodle.com/photos/9940e51940335108709568/base/201404/7838468592_40940b95c3_b-7bb37a_960x250.jpg'
        },{
            id: 1,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-17-at-4.53.43-PM-761594_960x250.jpg'
        },{
            id: 2,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/Screen-Shot-2013-12-18-at-10.10.27-AM-597c21_960x250.jpg'
        },{
            id: 3,
            url: 'http://www.kooboodle.com/photos/0b6f4cfcd76256579309102/base/201312/IMG_20131219_223956-22c63b_960x250.jpg'
        },{
            id: 4,
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
        }]
    },{
        id: 0,
        title: 'Winter',
        dateRange: {
            start: new Date('2013-02-02'),
            end: new Date('2014-04-01')
        },
        totalCount: 4,
        subItems: [{
            id: 0,
            url: 'http://uat.kooboodle.com/photos/9940e51940335108709568/base/201404/9280981547_893ce99a56_k-57697a_960x250.jpg'
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
        title: 'Spring',
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
        title: 'Autumn',
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
        title: 'Easter',
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
        title: 'Winter',
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
        title: 'Holidays',
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
        title: 'New Year',
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
        title: 'Birthday',
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
        title: 'Party',
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
        title: 'Zoo',
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
        title: 'Picnic',
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
        title: 'BBQ',
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
        title: 'Home',
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
        title: 'Waterpark',
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
        title: 'Lake',
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
        title: 'Beach Ontario Lake - 2013',
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