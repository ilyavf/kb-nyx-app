var request = require('request'),
    Q = require('q');


var clusterList = function (req, res) {
    console.log(timestamp() + 'module cluster.list');
    var url = 'http://uat.kooboodle.com/albums/list.json';
    req.pipe(request(url)).pipe(res);
};

var profile = function (req, res) {
    console.log(timestamp() + 'module cluster.list');
    var url = 'http://uat.kooboodle.com/user/profile.json';
    req.pipe(request(url)).pipe(res);
};

var login = function (req, res) {
    var email = req.param('email');
    console.log(timestamp() + '[module.cluster.login] email = ' + email);
    var callback = function (error, res, body) {
        console.log(timestamp() + '[module.cluster.login] error: ', error, body);
    };

    var zeusRequest = request.post('http://uat.kooboodle.com/user/openphoto/login.json', callback);

    req.pipe(zeusRequest).pipe(res);

    zeusRequest.form(req.body);
};

module.exports = {
    list: clusterList,
    login: login,
    profile: profile
};




function timestamp () {
    return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
}

var postLogin = function () {
    var callback = function (error, res, body) {
        console.log(timestamp() + '[module.cluster.login] error: ', error, res, body);
    };
    var zeusRequest = request
        .post('http://uat.kooboodle.com/user/openphoto/login.json', callback)
        .form();
    zeusRequest.append('email', 'ilya.fadeev@clickfree.com');
    zeusRequest.append('password', '123456');

};
//postLogin();