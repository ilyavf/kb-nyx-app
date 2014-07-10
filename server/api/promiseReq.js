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
            var json = tryParseBody(body);
            if (json.error) {
                console.log('[promiseGet] ERROR: ' + json.message + ' [promiseGet] url=' + url);
                deferred.reject(json.message + ' (' + res.statusCode + ')');
            } else {
                var result = resultParseFunc && resultParseFunc(json.body) || json.body;
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

var errorResponse = _.curry(function(res, err) {
    console.log('ERROR: ' + err);

    res.json({
        error: 1,
        success: false,
        message: err
    });
});

module.exports = {
    get: promiseGet,
    errorResponse: errorResponse
};