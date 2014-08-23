/**
 * CalendarMonthPhotosData resource.
 *
 * @memberOf    DataSource
 * @member      CalendarMonthPhotosData
 *
 * @author      IlyaVF
 * @date        August 23, 2014
 * @summary     Photos for a given album cluster
 * @property    {function} get  - Returns a promise of photos for a given album
 */

(function (define) {
    'use strict';

    define(['config'], function (config) {

        var CalendarMonthPhotosData = function ($location, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = config.apiPort,
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/calendar/{year}/{month}',
                albumsByYear = {};

            return function (year, month, options) {
                return albumsByYear[year] ||
                    (albumsByYear[year] =
                        ListData(apiUrl
                            .replace('{year}', year)
                            .replace('{month}', month), 'CalendarMonthPhotos-' + year + month, options),
                        albumsByYear[year]);
            }
        };

        return CalendarMonthPhotosData;

    });
}(define));