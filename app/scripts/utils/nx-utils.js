/**
 * Created by ilyafadeev on 2014-06-17.
 */

(function (global) {

    var utils = {}, _;

    if (typeof exports === 'object') {
        _ = require('ramda');
    } else {
        _ = ramda;
    }

    utils['_'] = _;

    utils.addProp = _.curry(function (prop, value, obj) {
        obj[prop] = value;
        return obj;
    });

    // (propName, propValue, predicate, arr, obj)
    utils.addPropIfMatch = _.curry(function (prop, sharedItems, obj) {
        obj[prop] = _.reduce(function (acc, cur) { return acc || cur.id == obj.id; }, false, sharedItems);
        return obj;
    });

    if (typeof exports === 'object') {
        module.exports = utils;
    } else if (global.define) {
        global.define([], utils );
    }
}(this))