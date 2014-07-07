var _ = require('ramda');

var log2 = _.curry(function (msg, a) {
    if (typeof a === 'object')
        console.log(msg + ': ', a);
    else
        console.log(msg + ': ' + a);
    return a;
});

var log3 = _.curry(function (msg, fn, a) {
    log2(msg, fn(a));
    return a;
});

module.exports = {
    ts: function timestamp () {
        return '[' + new Date().toJSON().replace('T',' ').replace(/.{5}$/,'') + '] ';
    },
    rnd: function () {
        return Math.round(Math.random()*10000);
    },
    log: function log (a) {
        console.log(a);
        return a;
    },
    log2: log2,
    log3: log3
};