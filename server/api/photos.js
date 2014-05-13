var request = require('request'),
    Q = require('q');

var clusterList = function (req, res) {

    getClusterList(req.headers).then(function (clustersPage) {
        var clusters = clustersPage.items;
        console.log('[clusterList.getClusters] resolved with clusters: ' + clusters.length);

        var clusterPromises = [];

        clusters.forEach(function (cluster) {

            clusterPromises.push(
                addPhotoUrls(cluster.items, 'url', req.headers)
            );

            // also add some extras to the cluster:
            cluster.title = cluster.name;
            cluster.dateFrom = '2004-04-24T12:00';
            cluster.dateTo = '2013-02-05T12:00';
            cluster.dashedTitle = cluster.name.toLowerCase().replace(/[\s\.\?,:;]/g, '-').replace(/[\-]+/g, '-');
        });

        Q.all(clusterPromises).then(function () {
            console.log('[clusterList.getCluster] resolved with photo urls for all clusters: ' + clusters.length);
            res.json({
                success: true,
                result: clustersPage
            });
        });
    });
};

var albumPhotoList = function (req, res) {
    var albumId = req.params.albumId;
    console.log('[api.photos.albumPhotoList] starting for ' + albumId);
    getAlbumPhotos(albumId, req.headers, req.query).then(function (photoListPage) {
        console.log('[api.photos.albumPhotoList] ' + albumId + ', resolved with list of photos: ' + photoListPage.length);
        addPhotoUrls(photoListPage, 'thumbnail', req.headers).then(function () {
            console.log('[api.photos.getAlbumPhotos] resolved with photo urls for items: ' + photoListPage.length);
            var items = photoListPage;

            res.json({
                success: true,
                result: {
                    currentPage: items[0].currentPage,
                    currentItems: items[0].currentRows,
                    pageSize: items[0].pageSize,
                    totalPages: items[0].totalPages,
                    totalItems: items[0].totalRows,
                    items: items
                }
            });
        });
    });
};

module.exports = {
    getClusters: clusterList,
    getAlbumPhotos: albumPhotoList
};


//------- PRIVATE FUNCTIONS --------//

/**
 * Retrieves photo url per item from OpenPhoto api and mutate items.
 * @param items - To be mutated by adding a new property urlPropertyName to each.
 * @param urlPropertyName
 * @param headers
 * @returns {Promise.promise|*}
 */
function addPhotoUrls (items, urlPropertyName, headers) {
    var deferred = Q.defer(),
        itemPromises = [];

    items.forEach(function (photo) {
        itemPromises.push(getPhotoUrl((photo.pid || photo.id), '500x200', headers));
    });

    Q.all(itemPromises).then(function (photoUrls) {
        items.forEach(function (o) {
            var urlObj = photoUrls.filter(function (cur) {
                return cur.id == (o.pid || o.id);
            })[0];
            o[urlPropertyName] = urlObj && urlObj.url;
        });
        deferred.resolve(items);
    });

    return deferred.promise;
}

function getClusterList (headers, query) {
    var url = 'http://z.uat.kooboodle.com/albums?items=5&'
            + (query && query.page ? 'page=' + query.page : '')
            + (query && query.pageSize ? '&pageSize=' + query.pageSize : ''),
        resultParseFunc = function (result) {
            return {
                currentPage: 1,
                totalPages: 1,
                totalItems: result.albums.length,
                items: result.albums
            };
        };

    return proxyTo(url, headers, resultParseFunc);
}

/**
 * Proxy to Zeus GET request for list of photos of a given album.
 * @param albumId
 * @param headers
 * @returns {items<Array>, totalItems, currentPage, ...}
 */
function getAlbumPhotos (albumId, headers, query) {
    var url = ('http://uat.kooboodle.com/photos/album-{albumId}/list.json?'
        + (query && query.page ? 'page=' + query.page : '')
        + (query && query.pageSize ? '&pageSize=' + query.pageSize : ''))
        .replace('{albumId}', albumId)
        .replace(/\?$/, '');
    console.log('[.getAlbumPhotos] url = ' + url);
    return proxyTo(url, headers);
}

function getPhotoUrl (photoId, size, headers) {
    var prefix = 'http://uat.kooboodle.com',
        url = prefix + '/photo/{photoId}/url/{size}.json'
            .replace('{photoId}', photoId)
            .replace('{size}', size),

        resultParseFunc = function (result) {
            return {
                id: photoId,
                url: prefix + result
            };
        };

    return proxyTo(url, headers, resultParseFunc);
}

function proxyTo (url, headers, resultParseFunc) {
    var deferred = Q.defer();

    request.get({
        url: url,
        headers: headers
    }, function (error, res, body) {
        if (!error) {
            var result = resultParseFunc && resultParseFunc(JSON.parse(body).result) || JSON.parse(body).result;
            console.log('[.proxyTo] url=' + url + ' : ' + (result.join ? result.length + ' items' : ''));
            deferred.resolve(result);
        } else {
            console.log('ERROR: [.proxyTo] url=' + url, error);
        }
    });

    return deferred.promise;
}

function timestamp () {
    return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
}
