/**
 * Created by ilyafadeev on 2014-07-10.
 * Set of function to work with photo items.
 */

(function (global) {
    function photoItemsDomain (utils) {
        var _ = utils._,
            api = {};

        api.updateSharedItems = function (items, pids) {
            _.map(
                _.compose(
                    utils.addProp('isSelected', false),
                    utils.addProp('alreadyShared', true)
                ),
                _.filter(_.compose(
                    _.flip(_.contains)(pids),
                    _.prop('pid')
                ))(items)
            );
            return items;
        };

        return api;
    }

    if (typeof exports === 'object') {
        module.exports = photoItemsDomain(require('../utils/nx-utils'));
    } else if (global.define) {
        global.define(['utils/nx-utils'], photoItemsDomain);
    }
}(this))



