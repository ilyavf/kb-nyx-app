var request = require('request'),
    _ = require('ramda'),
    Q = require('q'),
    util = require('util'),
    cfg = require('../../app/scripts/config');

function log (a) {
    console.log(a);
    return a;
}
var log2 = _.curry(function (msg, a) {
    console.log(msg + ': ' + a);
    return a;
});
var log3 = _.curry(function (msg, fn, a) {
    console.log(msg + ': ' + fn(a));
    return a;
});

var proxyTo = _.curry(function (resultParseFunc, headers, url) {
    var deferred = Q.defer();

    //console.log('[proxyTo] ' + url);

    request.get({
        url: url,
        headers: headers
    }, function (error, res, body) {
        if (!error) {
            var res = tryParseBody(body);
            if (res.error) {
                console.log('[.proxyTo] ERROR: ' + res.message + ' [.proxyTo] url=' + url);
                deferred.reject(res.message);
            } else {
                var result = resultParseFunc && resultParseFunc(res.body) || res.body;
                //console.log('[.proxyTo] url=' + url + (result && result.join ? ' returned ' + result.length + ' items' : ''));
                deferred.resolve(result);
            }
        } else {
            console.log('[.proxyTo] ERROR: url=' + url, error);
            deferred.reject(error);
        }
    });

    return deferred.promise;
});

function tryParseBody (body) {
    var res = {error: 0, body: null};
    try {
        res.body = JSON.parse(body);
    } catch (e) {
        //throw new Error('ERROR: Cannot parse json: ' + e);
        res.error = 1;
        res.message = 'Cannot parse json (' + e + ')';
    }
    return res;
}

var getPhotoUrl = _.curry(function  (url, size, headers, photoId) {
    url = url.replace('{photoId}', photoId)
        .replace('{size}', size);

    var resultParseFunc = function (data) {
        return {
            id: photoId,
            url: 'http://' + cfg.opServer + data.result
        };
    };

    return proxyTo(resultParseFunc, headers, url);

})('http://' + cfg.opServer + '/photo/{photoId}/url/{size}.json', '500x200');

var getTrades = _.curry(function (url, headers) {

    return function () {
        return proxyTo(null, headers, url);
    }

})(
    'http://zdev.kooboodle.com/trades?currentPage=1',
    {Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'}
);

function errorProxy (err) {
    console.log('ERROR: ' + err);
}

module.exports = {
    getTrades: getTrades,
    log: function (a) { console.log(a); return a;},
    proxyTo: proxyTo,
    getPhotoUrl: getPhotoUrl
};

//--- testing ---//
//getTrades();
/*_.compose(
    log,
    _.pick(['clusterId']),
    _.take(1),
    proxyTo(null, {Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'}, 'http://zdev.kooboodle.com/recommendation?currentPage=1')
);*/

log2('test log')(_.size([1,2,3]));
//log2('photo url', getPhotoUrl({Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'}))();
_.compose(log2('test prop'), _.map(_.prop('itemsToShare')))([{itemsToShare: '1'},{itemsToShare: '2'},{itemsToShare: '3'}]);

proxyTo(_.prop('result'), {Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'},
    'http://zdev.kooboodle.com/recommendation?currentPage=1'
    //'http://mydev.kooboodle.com:1337/zeus/recommendations'
)
    //.then(_.head)
    //.then(_.pick(['clusterId']))
    //.then(log)
    //.then(_.compose(log2('number of items'), _.size))
    .then(log3('number of items', _.size))
    //.then(log2('clusters'))
    .then(_.map(_.prop('itemsToShare')))
    .then(log3('numbers of itemsToShare', _.map(_.size)) )
    .then(log3('item to share', _.compose(_.keys, _.head, _.head) ))
    ////.then(_.map(_.map(_.compose(getPhotoUrl({}), _.prop('pid')))))
    .then(function (a) {
        return [a, _.map(_.map(_.compose(getPhotoUrl({}), _.prop('pid'))))(a)];
    })
    //.then(_.head)
    .then(_.compose(log3('clusters with promises', _.compose(_.size, _.last)), _.last))
    .then(log3('url promises by cluster', _.compose(_.map(_.size), _.last) ))
    .then(log3('url promises', _.compose(_.keys, _.head, _.head)))
    .then(_.flatten)
    .then(log3('total # of url promises', _.size))
    .then(Q.all)
    .then(_.map(log3('promise results', _.prop('id'))))
    .catch(errorProxy);