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
    if (typeof a === 'object')
        console.log(msg + ': ', a);
    else
        console.log(msg + ': ' + a);
    return a;
});
var log3 = _.curry(function (msg, fn, a) {
    log2(msg, fn(a));
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
            pid: photoId,
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
};

var addPropFn = _.curry(function (prop, fnVal, obj) {
    obj[prop] = typeof fnVal === 'function' ? fnVal(obj) : fnVal;
    return obj;
});

var reversedFind = _.curry(function (list, fn, obj) {
    return _.find(fn(obj), list);
});

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
log3('1st three', _.take(3), [1,2,3,4,5]);
log3('test copy pid', _.compose(_.prop('thumbs'),_.head, _.map(addPropFn('thumbs', _.compose(_.map(_.pick(['pid'])), _.take(5), _.prop('itemsToShare'))))))
([
    {itemsToShare:[{a:1,pid:10},{a:2,pid:20}]},
    {itemsToShare:[{a:3,pid:30},{a:4,pid:40}]}
]);
var testarr = [{a:1,b:1},{a:2,b:2},{a:3,b:3}]
log3('test filter', _.filter(_.where({a:2})), testarr);
log3('test reversed find', reversedFind(testarr, _.where), {a:2});

proxyTo(_.prop('result'), {Cookie:'EpiSession=92bd55f471400a85b38322f3ffc8ccb9'},
    'http://zdev.kooboodle.com/recommendation?currentPage=1'
    //'http://mydev.kooboodle.com:1337/zeus/recommendations'
)
    .then(log3('number of clusters', _.size))
    //.then(log3('1st cluster', _.head))
    .then(log3('id of the 1st cluster', _.compose(_.prop('clusterId'), _.head)))
    .then(log3('number of itemsToShare by cluster', _.map(_.compose(_.size, _.prop('itemsToShare')))))

    // for each cluster copy 1st five itemsToShare to items (only pid property):
    .then(_.map(addPropFn('thumbs', _.compose(_.map(_.pick(['pid'])), _.take(5), _.prop('itemsToShare')))))
    //.then(log3('1st cluster', _.head))

    //.then(_.map(_.map(_.compose(getPhotoUrl({}), _.prop('pid')))))
    .then(function (clusters) {
        return _.compose(
            Q.all,
            log3('url promises flatten', _.size),
            _.flatten,
            _.map(_.map(_.compose(getPhotoUrl({}), _.prop('pid')))), // array(array(pid))
            _.map(_.prop('thumbs'))
        )(clusters).then(function (urlPromises) {
            log3('1st url promise', _.head, urlPromises);
            _.map(_.compose(_.map(addPropFn('url', _.compose(_.prop('url'), reversedFind(urlPromises, _.where),_.pick('pid')))), _.prop('thumbs')))(clusters);
            return clusters;
        })
    })
    //.then(log2('result after addPropFn'))
    .then(log3('result after addPropFn', _.map(_.prop('thumbs'))))
    //.then(_.head)
    //.then(_.compose(log3('clusters with promises', _.compose(_.size, _.last)), _.last))
    //.then(log3('url promises by cluster', _.compose(_.map(_.size), _.last) ))

    //.then(log3('url promises', _.compose(_.keys, _.head, _.head)))
    //.then(_.flatten)
    .then(log3('total # of url promises', _.size))
    //.then(Q.all)
    //.then(_.map(log3('promise results', _.prop('id'))))

    .catch(errorProxy);