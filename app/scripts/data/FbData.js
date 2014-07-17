/**
 * FbData resource, set of Facebook api calls.
 *
 * @memberOf    DataSource
 * @member      FbData
 *
 * @author      IlyaVF
 * @date        July 15, 2014
 * @summary     Set of Facebook api calls
 * @property    {object} api  - All calls return a promise
 */

(function (define) {
    'use strict';

    define(['utils/nx-utils'], function (utils) {

        var _ = utils._,
            fbPictureUrl = 'https://graph.facebook.com/%s/picture?height=150&width=150';

        var FbData = function ($q, $facebook) {

            var friends = function () {
                return $facebook.cachedApi('/me/friends').then(
                    _.compose(
                        _.map(utils.addPropFn('picture', _.compose(utils.str(fbPictureUrl), _.prop('id')))),
                        utils.maybeArr,
                        _.prop('data')
                    )
                );
            };

            var tags = function () {
                return $facebook.cachedApi('/fql', {
                    q:  'SELECT owner, src FROM photo WHERE object_id IN (' +
                            'SELECT object_id FROM photo_tag WHERE subject = me()' +
                        ')'
                }).then(_.compose(_.map(utils.addPropFn('owner', _.compose(utils.toString, _.prop('owner')))), utils.maybeArr, _.prop('data')));
            };

            var friendsWithTags = function () {
                return $q.all({friends:friends(), tags:tags()}).then(function (data) {
                    return _.map(utils.addPropFn(
                        'tags',
                        _.compose(
                            _.map(_.prop('src')),
                            utils.reversedFilter(data.tags, _.compose(_.where, utils.unitProp('owner'), _.prop('id')))
                        )
                    ))(data.friends);
                });
            };

            var listPerms = function () {
                // TODO: since status of a permission is {granted | declined} filter only granted ones.
                return $facebook.api('/me/permissions').then(_.compose(_.keys, _.head, _.prop('data')));
            };

            var friendIds = function () {
                return friends().then(_.map(_.prop('id')));
            }

            var kbUserInfo = function (ids) {
                var apiUrl = '/api/fb-user-info?ids=' + ids.join(',');
                return ListData(apiUrl, 'FacebookUsersOnKb', {pageSize: 100});
            };

            var getKbUserInfo = function () {
                return friendIds().then(kbUserInfo);
            };

            return {
                login: $facebook.login,
                perm: $facebook.login,
                perms: listPerms,
                me: function () {
                    return $facebook.cachedApi('/me');
                },
                friends: friends,
                friendIds: friendIds,
                tags: tags,
                friendsWithTags: friendsWithTags,
                getKbUserInfo: getKbUserInfo,
                utils: utils
            }
        };

        return FbData;

    });
}(define));