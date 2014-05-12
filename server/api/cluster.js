var request = require('request'),
    Q = require('q');


var clusterList = function (req, res) {

    var clusterPromises = [];

    getClusterList(req.headers).then(function (clusters) {
        console.log('[clusterList.getClusterList] resolved with ' + clusters.length);
        var itemPromises;
        clusters.forEach(function (cluster) {
            var clusterDeferred = Q.defer();

            itemPromises = [];
            cluster.items.forEach(function (photo) {
                itemPromises.push(getPhotoUrl(photo.pid, '500x200', req.headers));
            });

            Q.all(itemPromises).then(function (photoUrls) {
                cluster.title = cluster.name;
                cluster.urlTitle = cluster.name.toLowerCase().replace(/\s/g, '-').replace(/[\-]+/g, '-');
                cluster.items.forEach(function (o) {
                    var urlObj = photoUrls.reduce(function (prev, cur) {
                        return cur.id == o.pid ? cur : prev;
                    }, {});
                    o.url = urlObj && urlObj.url;
                });
                clusterDeferred.resolve(cluster);
            });

            clusterPromises.push(clusterDeferred.promise);
        });

        Q.all(clusterPromises).then(function (clusters) {
            console.log('[clusterList.getClusterList] resolved for all photos ' + clusters.length);
            res.json({
                success: true,
                result: clusters
            });
        });
    });
};

var albumPhotoList = function (req, res) {

    getAlbumPhotos().then(function () {

    });
};


module.exports = {
    getClusters: clusterList,
    getAlbumPhotos: albumPhotoList
};


function getClusterList (headers) {
    var url = 'http://z.uat.kooboodle.com/albums?items=4',
        resultParseFunc = function (result) {
            return result.albums;
        };

    return proxyTo(url, headers, resultParseFunc);
};
function proxyTo (url, headers, resultParseFunc) {
    var deferred = Q.defer();

    request.get({
        url: url,
        headers: headers
    }, function (error, res, body) {
        if (!error) {
            var result = resultParseFunc && resultParseFunc(JSON.parse(body).result) || JSON.parse(body).result;
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}
function getPhotoUrl (photoId, size, headers) {
    var deferred = Q.defer(),
        prefix = 'http://uat.kooboodle.com',
        url = prefix + '/photo/{photoId}/url/{size}.json'
            .replace('{photoId}', photoId)
            .replace('{size}', size);

    request.get({
        url: url,
        headers: headers
    }, function (error, res, body) {
        if (!error) {
            deferred.resolve({
                id: photoId,
                url: prefix + JSON.parse(body).result
            });
        } else {
            console.log('ERROR::: [getPhotoUrl] url = ' + url, res);
        }
    });

    return deferred.promise;
}

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