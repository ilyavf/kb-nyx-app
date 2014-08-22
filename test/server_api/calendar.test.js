var cfg = require('../../app/scripts/config'),
    assert = require('assert'),
    api = require('../../server/api/calendarPhotos'),
    toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };

// https://github.com/pgte/nock
var nock = require('nock'),
    timeline_res_mock = require('../../server/data/zeus/calendar_timeline_mock.js'),
    month_06_mock = require('../../server/data/zeus/calendar_photos_06_mock.js'),
    month_10_mock = require('../../server/data/zeus/calendar_photos_10_mock.js');

nock('http://' + cfg.zeusServer)
    .get('/photos/timeline')
    .reply(200, timeline_res_mock)
    .get('/photos?takenAfter=20130601&takenBefore=20130701&pageSize=5&currentPage=1')
    .reply(200, month_06_mock)
    .get('/photos?takenAfter=20131001&takenBefore=20131101&pageSize=5&currentPage=1')
    .reply(200, month_10_mock);

// in mocks we have 10 items, so mock the following request 10 times:
var i = 10;
while (i--) {
    nock('http://' + cfg.opServer)
        .filteringPath(/photo1\/.*\/url/g, 'photo/abc123/url')
        .get('/photo/abc123/url/500x200.json')
        .reply(200, {"result": "/photo/abc123/create/08bfd/500x200.jpg"});
}

describe('Calendar', function(){
    describe('#getYear(req, res)', function(){
        it('should get month clusters of the given year', function(done){
            api.getYear({params:{year: '2013'}}, {headers: {cookie:''}, json: function(){}})
                .then(function (data) {
                    console.log('[test] data:', data);
                    assert.equal(data && data.success, true, 'should contain success property as true');
                    assert.equal(data && toType(data.result), 'object', 'should contain result property as object');
                    assert.equal(data && toType(data.result.items), 'array', 'should contain items array');
                })
                .catch(function (error) {
                    throw error;
                })
                .done(function () {
                    done();
                });
        });
    });
    describe('#toYmdNextMonth(year, month, day)', function(){
        it('should format next month correctly', function () {
            assert.equal(api.toYmdNextMonth(2012,1,1), '20120201');
            assert.equal(api.toYmdNextMonth(2012,11), '20121201');
            assert.equal(api.toYmdNextMonth(2012,11,05), '20121205');
            assert.equal(api.toYmdNextMonth(2012,12), '20130101');
        })
    })
});