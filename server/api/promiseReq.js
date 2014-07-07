var _ = require('ramda'),
    Q = require('q'),
    request = require('request');

var promiseGet = _.curry(function (resultParseFunc, headers, url) {
    var deferred = Q.defer();
    request.get({
        url: url,
        headers: headers
    }, function (error, res, body) {
        if (!error) {
            var res = tryParseBody(body);
            if (res.error) {
                console.log('[promiseGet] ERROR: ' + res.message + ' [promiseGet] url=' + url);
                deferred.reject(res.message);
            } else {
                var result = resultParseFunc && resultParseFunc(res.body) || res.body;
                deferred.resolve(result);
            }
        } else {
            console.log('[promiseGet] ERROR: url=' + url, error);
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

module.exports = {
    get: promiseGet
};