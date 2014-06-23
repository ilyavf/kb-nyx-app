/**
 * Created by ilyafadeev on 2014-06-12.
 */

(function (global) {
    var cfg = {
        opServer: 'qa.kooboodle.com',
        zeusServer: 'zqa.kooboodle.com'
    };

    if (typeof exports === 'object') {
        module.exports = cfg;
    } else {
        global.cfg = cfg;
    }
}(this))

