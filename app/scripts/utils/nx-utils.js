/**
 * Created by ilyafadeev on 2014-06-17.
 */

(function () {
    function NxUtils (_) {
        var utils = {};

        utils['_'] = _;

        utils.addProp = _.curry(function (prop, value, obj) {
            obj[prop] = value;
            return obj;
        });

        utils.addPropFn = _.curry(function (prop, fnVal, obj) {
            obj[prop] = typeof fnVal === 'function' ? fnVal(obj) : fnVal;
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

        utils.reversedFind = _.curry(function (list, fn, obj) {
            return _.find(fn(obj), list);
        });

        utils.reversedFilter = _.curry(function (list, fn, obj) {
            return _.filter(fn(obj), list);
        });

        utils.unitProp = _.curry(function (prop, val) {
            var o = {};
            o[prop] = val;
            return o;
        });

        utils.where = _.curry(function (props, obj) {
            return function () {};
        });

        utils.log = function (a) {
            console && console.log && console.log(a);
            return a;
        };

        utils.log2 = _.curry(function (msg, a) {
            if (typeof a === 'object')
                console && console.log && console.log(msg + ': ', a);
            else
                console && console.log && console.log(msg + ': ' + a);
            return a;
        });

        utils.log3 = _.curry(function (msg, fn, a) {
            utils.log2(msg, fn(a));
            return a;
        });

        utils.toString = function (a) {
            return ''.concat(a);
        };

        utils.str = _.curry(function (str, val) {
            return str.replace('%s', val);
        });

        return utils;
    }

    if (typeof exports === 'object') {
        module.exports = NxUtils(require('ramda'));
    } else if (typeof define === 'function' && define.amd) {
        define(['lib/ramda'], NxUtils );
    }
}());