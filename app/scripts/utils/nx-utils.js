/**
 * Created by ilyafadeev on 2014-06-17.
 */

(function (global) {
    function NxUtils (_) {
        var utils = {};

        utils['_'] = _;

        utils.addProp = _.curry(function (prop, value, obj) {
            obj[prop] = value;
            return obj;
        });

        // (propName, propValue, predicate, arr, obj)
        utils.addPropIfMatch = _.curry(function (prop, sharedItems, obj) {
            obj[prop] = _.reduce(function (acc, cur) { return acc || cur.pid == obj.pid; }, false, sharedItems);
            return obj;
        });

        utils.maybeArr = function (arr) {
            return arr || [];
        };

        return utils;
    }

    if (typeof exports === 'object') {
        module.exports = NxUtils(require('ramda'));
    } else if (global.define) {
        global.define(['lib/ramda'], NxUtils );
    }
}(this))