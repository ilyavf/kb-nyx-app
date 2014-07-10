    /**
 * SharePhotosData resource.
 *
 * @memberOf    DataSource
 * @member      SharePhotosData
 *
 * @author      IlyaVF
 * @date        June 3, 2014
 * @summary     Share photos to friends
 * @property    {function} send
 */

(function (define) {
    'use strict';

    define([], function () {

        var SharePhotosData = function ($location, $q, $http, $log) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = '1337',
                prefix = proto + '://' + host + ':' + port,
                zeus = proto + '://zdev.kooboodle.com',
                //apiUrl = prefix + '/api/share/photos';
                shareUrl = zeus + '/share/photos',
                shareRecommendationUrl = shareUrl + '/recommendation/{recommendationId}',
                apiUrl = shareUrl;

            var send = function (ids, contacts, recommendationId) {
                var deferred = $q.defer();

                if (recommendationId) {
                    apiUrl = shareRecommendationUrl.replace('{recommendationId}', recommendationId);
                }

                $log.log('[SharePhotosData.send] url=' + apiUrl + ', contacts=' + (contacts && contacts.length) + ', ids= ' + ids.length, contacts, ids);

                $http({
                    method: 'POST',
                    url: apiUrl,
                    data: {
                        shareType: 'email',
                        pids: ids.join(','),
                        recipients: contacts && contacts.join(',') || ''
                    },
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    $log.log('[SharePhotosData.send]: received', arguments);
                    if (data.code == 200) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject({
                                success: false,
                                message: data.message || 'Unknown error'
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    $log.error('[SharePhotosData.send]: error', arguments);
                    deferred.reject({
                        success: false,
                        data: data.result,
                        message: data.message || 'Error while trying to load cluster list'
                    });
                });

                return deferred.promise;
            };

            return {
                send: send
            };
        };

        return SharePhotosData;

    });
}(define));