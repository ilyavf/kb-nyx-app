var request = require('request'),
    timestamp = require('../utils').ts,
    rnd = require('../utils').rnd;

var callback = function (msg) {
    return function (error, res, body) {
        console.log(timestamp() + msg, error, body);
    }
};

function proxyGet (url) {
    var id = '[module.proxy.get ' + rnd() + ']';
    return function (req, res) {
        console.log(timestamp() + id + ' url = ' + url);
        var proxyRequest = request(url, callback(id));
        req.pipe(proxyRequest).pipe(res);
    }
}
function proxyPost (url) {
    var id = '[module.proxy.post ' + rnd() + ']';
    return function (req, res) {
        console.log(timestamp() + id + ' url = ' + url);
        var proxyRequest = request.post(url, callback(id));
        req.pipe(proxyRequest).pipe(res);
        proxyRequest.form(req.body);
    }
}

module.exports = {
    get: proxyGet,
    post: proxyPost
};
