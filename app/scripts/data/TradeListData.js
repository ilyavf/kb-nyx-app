/**
 * TradeListData resource.
 *
 * @memberOf    DataSource
 * @member      TradeListData
 *
 * @author      IlyaVF
 * @date        June 19, 2014
 * @summary     List of trades of photos
 * @property    {function} get  - Returns a promise
 */

(function (define) {
    'use strict';

    define(['config'], function (config) {
        var TradeListData = function ($location, $q, $http, ListData) {

            var proto = $location.protocol(),
                host = $location.host(),
                port = config.apiPort,
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/trades';

            return ListData(apiUrl, 'TradeList');
        };

        return TradeListData;

    });
}(define));