/**
 * Created by ilyafadeev on 2014-06-12.
 */

(function (global) {
    var cfg = {
        opServer: 'dev.kooboodle.com',
        zeusServer: 'zdev.kooboodle.com'
    };

    if (typeof exports === 'object') {
        module.exports = cfg;
    } else {
        global.cfg = cfg;
    }
}(this))

