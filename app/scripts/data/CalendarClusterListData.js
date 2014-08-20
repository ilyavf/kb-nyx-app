/**
 * CalendarPhotosData resource.
 *
 * @memberOf    DataSource
 * @member      CalendarClusterListData
 *
 * @author      IlyaVF
 * @date        April 29, 2014
 * @summary     Photos for a given album cluster
 * @property    {function} get  - Returns a promise of photos for a given album
 */

(function (define) {
    'use strict';

    define(['config'], function (config) {

        var CalendarClusterListData = function ($location, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = config.apiPort,
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/calendar/{year}',
                albumsByYear = {};

            return function (year, options) {
                return albumsByYear[year] ||
                    (albumsByYear[year] = ListData(apiUrl.replace('{year}', year), 'CalendarYearPhotos-' + year, options),
                    albumsByYear[year]);
            }
        };

        return CalendarClusterListData;

    });
}(define));