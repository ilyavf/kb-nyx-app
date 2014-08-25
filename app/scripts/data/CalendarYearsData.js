/**
 * CalendarTimelineData resource.
 *
 * @memberOf    DataSource
 * @member      CalendarTimelineData
 *
 * @author      IlyaVF
 * @date        August 21, 2014
 * @summary     List of year/month that contain photos
 * @property    {function} get  - Returns a promise
 */

(function (define) {
    'use strict';

    define(['config', 'utils/nx-utils'], function (config, utils) {
        var _ = utils._;

        var CalendarYearsData = function ($location, $q, $http, ListData) {

            var proto = $location.protocol(),
                host = config.zeusServer,
                prefix = proto + '://' + host,
                apiUrl = prefix + '/photos/timeline';

            // NB: probably a mistake on zeus api that wraps data in "result" twice
            // (see server/data/zeus/calendar_timeline_mock.js for response example)

            var collectUniqueYears = _.compose(utils.log2('*timeline-years*'), _.uniq, _.map(_.prop('year')), _.prop('result')),
                collectYearMonths = function (year) {
                    return _.compose(utils.log2('*timeline-months-'+year+'*'), _.map(_.prop('month')), _.filter(_.where({year:year})), _.prop('result'));
                };

            //return ListData(apiUrl, 'CalendarTimeline2Data', {preprocess1: collectUniqueYears});

            return function (year) {
                var postprocess = year ? collectYearMonths(year) : collectUniqueYears;
                return ListData(apiUrl, 'CalendarTimelineData', {postprocess: postprocess});
            }
        };

        return CalendarYearsData;

    });
}(define));