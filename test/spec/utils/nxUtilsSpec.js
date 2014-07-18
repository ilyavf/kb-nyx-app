(function (define) {
    'use strict';

    define([
        'utils/nx-utils'
    ], function (utils) {

        var _ = utils._;

        describe('Utils: filterByProp', function () {

            var list, objArr;

            beforeEach(function () {
                list = [1,3,5];
                objArr = [{a:2},{a:3},{a:4},{a:5},{a:6}];
            });

            it('filterByProp should filter items which contains property in the given list', function() {
                var filtered = utils.filterByProp(list, 'a', objArr);
                expect(_.size(filtered)).toBe(2);
                expect(_.prop('a', _.head(filtered))).toBe(3);
                expect(_.prop('a', _.last(filtered))).toBe(5);
            });

        });

    });

}(define));
