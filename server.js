/**
 * Run with environment parameter:
 * $ NODE_ENV=production node server.js
 * $ NODE_ENV=test node server.js
 *
 * To specify port directly:
 * $ NODE_ENV=production, PORT=1234, PORT_SSL=1235 node server.js
 *
 * To disable ssl:
 * $ PORT_SSL=0 node server.js
 *
 */

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV='development';
}

var express = require('express'),
    http = require('http'),
    path = require('path'),
    proxy = require('./server/api/proxy'),
    photoApi = require('./server/api/photos'),
    tradeApi = require('./server/api/tradePhotos'),
    userApi = require('./server/api/kbUsers'),
    bodyParser = require('body-parser'),
    https = require('https'),
    fs = require('fs'),
    timestamp = require('./server/utils').ts;

var APP_PORT = process.env.PORT || 1337,
    APP_PORT_SECURE = process.env.PORT_SSL || 1338,
    SSL = getEnvParam(process.env.SSL, false),
    MOCK_API = getEnvParam(process.env.MOCK_API, false),
    app_dir = process.env.NODE_ENV === 'production' ? 'dist_prod' : 'dist',
    clientDir = path.join(__dirname, app_dir),
    ssl_dir = path.join(__dirname, '../ssl'),
    app = express(),
    cfg = require('./app/scripts/config');

app.use(express.static(clientDir));

app.use(bodyParser());

// API CORS:
app.all('*', function (req, res, next) {
    if (!req.get('Origin') || req.get('Origin').search('kooboodle.com') === -1) return next();
    res.set('Access-Control-Allow-Origin', req.get('Origin'));
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.post('/api/login', proxy.post('http://' + cfg.opServer + '/user/openphoto/login.json'));
app.post('/api/signup', proxy.post('http://' + cfg.opServer + '/cf/user/register.json'));
app.get('/api/profile', proxy.get('http://' + cfg.opServer + '/user/profile.json'));
app.post('/api/album/update/:id', proxy.post('http://' + cfg.zeusServer + '/album/update/:id'));
app.post('/api/share/photos', bodyParser(), proxy.post('http://' + cfg.zeusServer + '/share/photos'));

app.get('/api/clusters', MOCK_API ? mockApi('clusters') : photoApi.getClusters);
app.get('/api/album/:albumId/photos', MOCK_API ? mockApi('album') : photoApi.getAlbumPhotos);
app.get('/api/trades', MOCK_API ? mockApi('trades') : tradeApi.getTrades);
app.get('/api/fb-user-info', userApi.fbUserInfo);
app.get('/zeus/recommendations', mockApi('zeus/recommendations'));

app.all('/', function(req, res) {
    res.sendfile(path.join(clientDir, 'index.html'));
});

// Error handling:
app.use(logErrors);
app.use(clientErrorHandler);

var httpServer = http.createServer(app);
httpServer.listen(APP_PORT);

console.log(timestamp() + process.env.NODE_ENV.toUpperCase() + '. Client app folder: ' + clientDir);
console.log(timestamp() + 'HTTP:  on port ' + APP_PORT);
console.log(timestamp() + 'Config: ' + cfg.opServer + ', ' + cfg.zeusServer);

if (SSL) {
    // HTTPS options:
    var credentials = {
        key: fs.readFileSync(ssl_dir + '/kooboodle.key'),
        cert: fs.readFileSync(ssl_dir + '/kooboodle.crt')
    };

    https
        .createServer(credentials, app)
        .listen(APP_PORT_SECURE);

    console.log(timestamp() + 'HTTPS:  on port ' + APP_PORT_SECURE);
} else {
    console.log(timestamp() + 'NO SSL');
}
console.log('MOCK_API=' + MOCK_API);


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, { error: 'Something blew up!' });
    } else {
        next(err);
    }
}
function mockApi (api) {
    return function (req, res) {
        var mock = require('./server/data/' + api + '_mock.js');
        console.log('Responding with a mocked api for ' + req.url);
        res.json(mock);
    }
}
function getEnvParam(param, defaultValue) {
    return typeof param === 'undefined' ? defaultValue
        : (typeof defaultValue === 'boolean' ?
            (param === 'true' ? true : false)
            : param);
}
