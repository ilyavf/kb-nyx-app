var request = require('request'),
    Q = require('q'),
    _ = require('ramda'),
    util = require('util'),
    nxutils = require('../utils'),
    log = nxutils.log,
    log2 = nxutils.log2,
    log3 = nxutils.log3,
    tradeApi = require('./tradePhotos'),
    getUrlPromiseByPid = tradeApi.getUrlPromiseByPid,
    addThumbUrlsToCluster = tradeApi.addThumbUrlsToCluster,
    promisePost = require('./promiseReq').post,
    promiseGet = require('./promiseReq').get,
    errorResponse = require('./promiseReq').errorResponse,
    cfg = require('../../app/scripts/config');


var fbUserInfo = function (req, res) {
    var ids = req.query.ids && req.query.ids.split(',') || [];
    console.log('[fbUserInfo] ' + ids.length, req.query);
    console.log(req.headers);

    //{"candidates": [{"id":"1000067719101491", "identityType": "facebook"}]}
    var data = {
            candidates: ids.map(function (id) { return {id: id, identityType: "facebook"} })
        };

    Q.all([
        promisePost(
            _.compose(_.prop('users'), _.prop('result')),
            {
                headers: _.mixin(_.pick(['cookie'],req.headers), {'Content-Type': 'application/json'}),
                data: data
            },
            'http://' + cfg.zeusServer + '/user/verify'
        ),
        promiseGet(
            _.compose(_.prop('contacts'), _.prop('result')),
            {
                headers: _.mixin(_.pick(['cookie'],req.headers), {'Content-Type': 'application/json'})
            },
                'http://' + cfg.zeusServer + '/contact/sent_invite'
        )
            .then(nxutils.filterByProp(ids, 'contactInfo'))
            .then(_.map(nxutils.addPropFn('facebookId', _.prop('contactInfo'))))
    ])
        .then(_.flatten)

        .then(log2('fbUserInfo'))


        .then(function (items) {
            res.json({
                error: 0,
                success: true,
                result: {
                    currentPage: 1,
                    items: items
                }
            });
        })

        .catch(errorResponse(res));
};



module.exports = {
    fbUserInfo: fbUserInfo
};