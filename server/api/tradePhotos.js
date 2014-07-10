var request = require('request'),
    _ = require('ramda'),
    Q = require('q'),
    utils = require('./../utils'),
    log = utils.log,
    log2 = utils.log2,
    log3 = utils.log3,
    size = utils.size,
    promiseGet = require('./promiseReq').get,
    errorResponse = require('./promiseReq').errorResponse,

    cfg = require('../../app/scripts/config');

var getPhotoUrl = _.curry(function  (url, size, headers, photoId) {
    url = url.replace('{photoId}', photoId)
        .replace('{size}', size);

    var resultParseFunc = function (data) {
        return {
            pid: photoId,
            url: 'http://' + cfg.opServer + data.result
        };
    };

    return promiseGet(resultParseFunc, headers, url);

})('http://' + cfg.opServer + '/photo/{photoId}/url/{size}.json', '500x200');

var getTrades = function (req, res) {

    /* refactor:
    pipe(merge([
            getRecommendations(url1, cookies, normalize),
            getTrades(url2, cookies)
        ]),

        addItemsFromMatches,
        getItemsUrls
     );
     */

    // get recommendations:
    promiseGet(_.prop('result'), _.pick(['cookie'], req.headers),
        'http://' + cfg.zeusServer + '/recommendation?currentPage=1'
    )
        .then(log3('number of clusters', _.size))
        .then(log3('id of recommendation clusters', _.map(_.prop('cluster_id'))))

        // normalize structure:
        .then(_.map(addPropFn('recommendation_id', _.prop('id'))))
        .then(_.map(addMatchesFromCluster))
        .then(_.map(_.pick(['recommendation_id','cluster_id','matches','timestamp','startDate','endDate'])))

        // get trades and merge with recommendations:
        .then(function (recommendations) {

            return promiseGet(_.prop('result'), _.pick(['cookie'], req.headers),
                'http://' + cfg.zeusServer + '/trade?currentPage=1'
            ).then(function (trades) {
                log('trades: ' + trades.length);
                log3('id of trade clusters', _.map(_.prop('cluster_id')))(trades);

                return recommendations.concat(trades);
            });
        })

        .then(log3('number of itemsToShare by cluster', _.map(_.compose(_.size, _.prop('itemsToShare'), _.head, _.prop('matches')))))

        // for each cluster copy 1st five itemsToShare to items (only pid property):
        .then(_.map(addThumbsFromItems))
        .then(function (clusters) {
            return _.compose(
                Q.all,
                log3('url promises flatten', _.size),
                _.flatten,                          // >>> array(promises)
                _.map(_.map(getUrlPromiseByPid)),   // >>> array(array(promises)
                _.map(_.prop('items'))             // >>> array(array({pid})
            )(clusters).then(addThumbUrlsToClusters(clusters))
        })
        .then(log3('result after addPropFn', _.map(_.prop('items'))))

        .then(
            _.map(
                addPropFn(
                    'totalCount',
                    _.fork(
                        _.add,
                        _.compose(size, _.prop('itemsShared'), _.head, _.prop('matches')),
                        _.compose(size, _.prop('itemsToShare'), _.head, _.prop('matches'))
                    )
                )
            )
        )
        .then(_.map(addPropFn('title', getTitleFromDates)))
        .then(_.map(addPropFn('dashedTitle', getDashedTitleFromDates)))

        .then(function (tradeClusters) {
            res.json({
                error: 0,
                success: true,
                result: {
                    currentPage: 1,
                    items: tradeClusters
                }
            });
        })

        .catch(errorResponse(res));
};

var addPropFn = _.curry(function (prop, fnVal, obj) {
    obj[prop] = typeof fnVal === 'function' ? fnVal(obj) : fnVal;
    return obj;
});

var reversedFind = _.curry(function (list, fn, obj) {
    return _.find(fn(obj), list);
});

var addThumbsFromItems = addPropFn('items',
    _.compose(_.map(_.pick(['pid'])), _.take(5), _.prop('itemsToShare'), _.head, _.prop('matches'))
);

var addMatchesFromCluster = addPropFn('matches', _.compose(utils.arrUnit, _.pick(['matchUid','matchClusterId','matchEmail','matchFullname','matchType', 'itemsToShare'])));

var getUrlPromiseByPid = _.compose(getPhotoUrl({}), _.prop('pid'));

var addThumbUrlsToCluster = _.curry(function (urlPromises, cluster) {
    _.compose(_.map(addPropFn('url', _.compose(_.prop('url'), reversedFind(urlPromises, _.where),_.pick('pid')))), _.prop('items'))(cluster);
    return cluster;
});
var addThumbUrlsToClusters = _.curry(function (clusters, urlPromises) {
    _.map(addThumbUrlsToCluster(urlPromises))(clusters);
    return clusters;
});

var getTitleFromDates = _.curry(function (obj) {
    return new Date(obj.startDate * 1000).toDateString() + ' - ' + new Date(obj.startDate * 1000).toDateString();
});
var getDashedTitleFromDates = _.curry(function (obj) {
    return getTitleFromDates(obj).replace(/\s/g,'-').replace(/[-]+/g,'-');
});


//--- testing ---//
/*
log2('test log')(_.size([1,2,3]));
//log2('photo url', getPhotoUrl({Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'}))();
_.compose(log2('test prop'), _.map(_.prop('itemsToShare')))([{itemsToShare: '1'},{itemsToShare: '2'},{itemsToShare: '3'}]);
log3('1st three', _.take(3), [1,2,3,4,5]);
log3('test copy pid', _.compose(_.prop('thumbs'),_.head, _.map(addPropFn('thumbs', _.compose(_.map(_.pick(['pid'])), _.take(5), _.prop('itemsToShare'))))))
([
    {itemsToShare:[{a:1,pid:10},{a:2,pid:20}]},
    {itemsToShare:[{a:3,pid:30},{a:4,pid:40}]}
]);
var testarr = [{a:1,b:1},{a:2,b:2},{a:3,b:3}]
log3('test filter', _.filter(_.where({a:2})), testarr);
log3('test reversed find', reversedFind(testarr, _.where), {a:2});

getTrades({},{json: log});
*/


//--- Public API ---//

module.exports = {
    getTrades: getTrades,
    getPhotoUrl: getPhotoUrl,
    getUrlPromiseByPid: getUrlPromiseByPid,
    addThumbUrlsToCluster: addThumbUrlsToCluster
};