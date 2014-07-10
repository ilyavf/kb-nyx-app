(function (define) {
    'use strict';

    define([
        'utils/nx-utils',
        'domain/PhotoItems'
    ], function (utils, DomainPhotoItems) {

        var _ = utils._;

        describe('Domain: Photo Items', function () {

            var items;

            beforeEach(function () {
                items = [{
                    pid: 'aaa', isSelected: true, alreadyShared: false
                },{
                    pid: 'bbb', isSelected: false, alreadyShared: false
                },{
                    pid: 'ccc', isSelected: false, alreadyShared: false
                },{
                    pid: 'ddd', isSelected: true, alreadyShared: false
                }];
            });

            it('updateSharedItems should update flags on shared items', function() {
                var countSelected = _.compose(_.size, _.filter(_.where({isSelected: true})));
                var countShared = _.compose(_.size, _.filter(_.where({alreadyShared: true})));

                expect(_.size(items)).toBe(4);
                expect(countSelected(items)).toBe(2);
                expect(countShared(items)).toBe(0);

                var updatedItems = DomainPhotoItems.updateSharedItems(items, ['aaa', 'ddd']);

                expect(countSelected(updatedItems)).toBe(0);
                expect(countShared(updatedItems)).toBe(2);
            });

        });


    });

}(define));
