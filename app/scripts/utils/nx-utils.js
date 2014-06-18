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

    if (typeof exports === 'object') {
        module.exports = utils;
    } else if (global.define) {
        global.define([], utils );
    }
}(this))