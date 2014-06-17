var request = require('request'),
    timestamp = require('../utils').ts,
    rnd = require('../utils').rnd,
    _ = require('ramda');

var get_callback = function (msg) {
    return function (error, res, body) {
        console.log(timestamp() + msg, error, body);
        if (error) {
            res.json({
                success: false,
                msg: "ERROR: could not proxy the request. " + error.code
            });
        }
    };
};

function proxyGet (url) {
    var id = '[module.proxy.get ' + rnd() + ']';
    return function (req, res) {
        console.log(timestamp() + id + ' url = ' + url);
        var proxyRequest = request(url, get_callback(id));
        req.pipe(proxyRequest).pipe(res);
    }
}
function proxyPost (url, method) {
    method = method || 'post';
    var id = '[module.proxy.' + method + ': ' + rnd() + ']';
    return function (req, res) {

        /*
        // /albums/:id/title/:action
        // /albums/{id}/title/{action}
        // {id: 5, action: 'update'}
        // -> /albums/5/title/update
        var getParams = _.curry(function (pattern, str) {
            return str.match(pattern);
        });
        var getParamsColumned = getParams(/:[a-z]+/g);
        var getParamsBracketed = getParams(/{[a-z]+}/g);
        var getParamName = function (param) {
            return param.match(/[a-z]+/g);
        };
        var urlReplaceParams = function (getParamName, url, needles, params) {
            return needles && needles.reduce(
                function (url, n) {
                    return url.replace(n, params[getParamName(n)]);
                },
                url
            ) || url;
        };
        url = urlReplaceParams(getParamName, url, getParamsColumned(url), req.params)
            + (req._parsedUrl.query ? '?' + req._parsedUrl.query : '');
        //_.maybe(_.map)(urlReplaceParams, url.match(/:[a-z]+/g));
*/
        console.log(timestamp() + id + ' url = ' + url);
        console.log('Origin: ' + req.get('Origin'));
        var proxyRequest = request[method](url, get_callback(id));
        req.pipe(proxyRequest).pipe(res);
        proxyRequest.form(req.body);
    }
}

module.exports = {
    get: proxyGet,
    post: proxyPost,
    put: function (url) {
        return proxyPost(url, 'put')
    }
};
