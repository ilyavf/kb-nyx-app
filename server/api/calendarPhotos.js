var request = require('request'),
    _ = require('ramda'),
    Q = require('q'),
    util = require('util'),
    dateUtils = require('date-utils'),
    utils = require('./../utils'),
    log = utils.log,
    log2 = utils.log2,
    log3 = utils.log3,
    photoUtils = require('./tradePhotos'),
    getUrlPromiseByPid = photoUtils.getUrlPromiseByPid,
    addThumbUrlsToClusters = photoUtils.addThumbUrlsToClusters,
    reversedFind = utils.reversedFind,
    size = utils.size,
    addPropFn = utils.addPropFn,
    promiseGet = require('./promiseReq').get,
    errorResponse = require('./promiseReq').errorResponse,

    cfg = require('../../app/scripts/config');

// http://zdev.kooboodle.com/photos/timeline
// http://zdev.kooboodle.com/photos?takenAfter=20130101&takenBefore=20131231

/*
To get the calendar view (month clusters for the given year with 5 items each) we have to:
1. Get list of months for the year using /photos/timeline.
2. For each month get photos with pageSize of 5 from /photos using takenAfter and takenBefore.
The result will also contain total number of items.
3. For each item call thumbnail service to get thumbnail url.
 */

/**
 * @param x {string} Month or day to be formatted to two digit string
 * @returns {string} Two digit string
 */
function formatXX (x) {
    return (x + '').length === 1 ? '0'+x : ''+x;
}
function toYmd (year, month, day) {
    day = day || '01';
    return year + formatXX(month) + formatXX(day);
}
function toYmdNextMonth (year, month, day) {
    year = parseInt(year);
    month = parseInt(month);
    return toYmd((month === 12 ? ++year : year), ((month + 1)%12 || 12), day);
}

var getYear = function (req, res) {
    var year = req.params.year,
        serverUrl = 'http://' + cfg.zeusServer,
        timelineUrl = serverUrl + '/photos/timeline',
        photosUrl = serverUrl + '/photos?takenAfter={after}&takenBefore={before}&pageSize=5&currentPage=1'

    console.log('[calendarPhotos.getYear] timelineUrl: ' + timelineUrl);
    console.log('[calendarPhotos.getYear] photosUrl: ' + photosUrl);

    return promiseGet(
        _.prop('result'),
        _.pick(['cookie'], req.headers),
        timelineUrl
    )
        //.then(log2('timeline'))
        .then(_.prop('result'))

        // filter given year and take month:
        // :: array({year,month}) -> array(month)
        .then(_.compose(_.map(_.prop('month')), _.filter(_.where({'year':year}))))
        //.then(log2('months'))

        // format all months to 2 digits:
        .then(_.map(formatXX))
        //.then(log2('months formatted'))

        // retrieve photos by month:
        .then(_.compose(
            Q.all,
            _.map(function (month) {
                return promiseGet(
                    _.prop('result'),
                    _.pick(['cookie'], req.headers),
                    photosUrl
                        .replace('{after}', toYmd(year, month))
                        .replace('{before}', toYmdNextMonth(year, month))
                )
            })
        ))
        //.then(log3('all promises:', _.size))

        // - reformat according to other cluster api
        .then(_.map(function (monthPhotos) {
            //log2('monthPhotos[i]', monthPhotos);
            return {
                title: (new Date(monthPhotos.photos[0].dateTaken * 1000)).toFormat('MMMM YYYY'), // see date-utils package
                totalCount: monthPhotos.totalItems,
                items: monthPhotos.photos
            }
        }))
        //.then(log2('reformatted month photos'))

        // add thumbnail url per photo:
        .then(function (clusters) {
            return _.compose(
                Q.all,
                //log3('url promises flatten', _.size),
                _.flatten,                          // >>> array(promises)
                _.map(_.map(getUrlPromiseByPid)),   // >>> array(array(promises)
                _.map(_.prop('items'))             // >>> array(array({pid})
            )(clusters).then(addThumbUrlsToClusters(clusters))
        })
        //.then(log3('all promises after thumb urls:', _.size))

        .then(_.map(addPropFn('dashedTitle', _.compose(function(t){return t.replace(/\s/g, '-');}, _.prop('title')))))

        .then(function (clusters) {
            var result = {
                success: true,
                result: {
                    totalItems: clusters.length,
                    items: clusters
                }
            };

            // send out to client:
            res.json(result);

            return result;
        })

        .catch(function (error) {
            console.log('ERROR: cannot get year clusters. ' + error.message);
            res.json({
                error: 1,
                message: error.message
            });
        });

};



module.exports = {
    getYear: getYear,
    toYmdNextMonth: toYmdNextMonth
};