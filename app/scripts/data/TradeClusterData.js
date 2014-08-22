/**
 * TradeClusterData resource.
 *
 * @memberOf    DataSource
 * @member      TradeClusterData
 *
 * @author      IlyaVF
 * @date        June 24, 2014
 * @summary     Photos for a given album cluster being traded with a given user
 * @property    {function} get  - Returns a promise of photos for the given cluster marking photos traded to the given user
 */

(function (define) {
    'use strict';

    define(['utils/nx-utils'], function (utils) {

        var TradeClusterData = function ($location, albumPhotosData) {
            var addPropIfMatch = utils.addPropIfMatch,
                _ = utils._;

            return function (clusterId, sharedItems) {
                sharedItems = sharedItems || [];
                var addSharedFlag = _.compose(_.map(addPropIfMatch('alreadyShared', sharedItems)), _.get('items'));
                return albumPhotosData(clusterId, {mutate: addSharedFlag});
            }
        };

        return TradeClusterData;

    });
}(define));