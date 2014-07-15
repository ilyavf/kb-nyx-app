/**
 * Created by ilyafadeev on 2014-06-12.
 */

(function () {
    var cfg = {
        opServer: 'dev.kooboodle.com',
        zeusServer: 'zdev.kooboodle.com',
        fbAppId: '203880539796100'
    };

    if (typeof exports === 'object') {
        console.log('- exporting cfg...');
        module.exports = cfg;
    } else if (typeof define === 'function' && define.amd) {
        define(cfg);
    }
}());

