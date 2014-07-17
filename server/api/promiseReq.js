var _ = require('ramda'),
    Q = require('q'),
    request = require('request');

var promiseGet = _.curry(function (method, resultParseFunc, options, url) {
    var deferred = Q.defer(),
        requestOptions = {
            url: url,
            headers: options.headers || options
        };

    if (options.data) {
        requestOptions.json = options.data;
    }

    console.log('[promiseGet] ' + method + ', ' + url + ', ', requestOptions);

    request[method](requestOptions, function (error, res, body) {
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
        if (typeof body === 'string') {
            res.body = JSON.parse(body);
        } else {
            res.body = body;
        }
    } catch (e) {
        //throw new Error('ERROR: Cannot parse json: ' + e);
        res.error = 1;
        res.message = 'Cannot parse json (' + e + ')';
        console.log(res.message);
        console.log('------------');
        console.dir(body);
        console.log('------------');
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
    get: promiseGet('get'),
    post: promiseGet('post'),
    errorResponse: errorResponse
};