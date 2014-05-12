var request = require('request'),
    Q = require('q');

var clusterList = function (req, res) {

    getClusterList(req.headers).then(function (clusters) {
        console.log('[clusterList.getClusters] resolved with clusters: ' + clusters.length);

        var clusterPromises = [];

        clusters.forEach(function (cluster) {

            clusterPromises.push(
                getPhotoUrls(cluster.items, 'url', req.headers)
            );

            // also add some extras to the cluster:
            cluster.title = cluster.name;
            cluster.urlTitle = cluster.name.toLowerCase().replace(/\s/g, '-').replace(/[\-]+/g, '-');
        });

        Q.all(clusterPromises).then(function () {
            console.log('[clusterList.getCluster] resolved with photo urls for all clusters: ' + clusters.length);
            res.json({
                success: true,
                result: clusters
            });
        });
    });
};

var albumPhotoList = function (req, res) {

    getAlbumPhotos(req.albumId, req.headers).then(function (photoListPage) {

    });
};

module.exports = {
    getClusters: clusterList,
    getAlbumPhotos: albumPhotoList
};


//------- PRIVATE FUNCTIONS --------//

/**
 * Retrieves photo url per item from OpenPhoto api.
 * @param items - To be mutated by adding a new property urlPropertyName to each.
 * @param urlPropertyName
 * @param headers
 * @returns {Promise.promise|*}
 */
function getPhotoUrls (items, urlPropertyName, headers) {
    var deferred = Q.defer(),
        itemPromises = [];

    items.forEach(function (photo) {
        itemPromises.push(getPhotoUrl(photo.pid, '500x200', headers));
    });

    Q.all(itemPromises).then(function (photoUrls) {
        items.forEach(function (o) {
            var urlObj = photoUrls.filter(function (cur) {
                return cur.id == o.pid;
            })[0];
            o[urlPropertyName] = urlObj && urlObj.url;
        });
        deferred.resolve(items);
    });

    return deferred.promise;
}

function getClusterList (headers) {
    var url = 'http://z.uat.kooboodle.com/albums?items=4',
        resultParseFunc = function (result) {
            return result.albums;
        };

    return proxyTo(url, headers, resultParseFunc);
}

/**
 * Proxy to Zeus get request for list of photos of a given album.
 * @param albumId
 * @param headers
 * @returns {items<Array>, totalItems, currentPage, ...}
 */
function getAlbumPhotos (albumId, headers) {
    var url = 'http://uat.kooboodle.com/photos/album-{albumId}/list.json'
            .replace('{albumId}', albumId);
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
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

function timestamp () {
    return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
}
