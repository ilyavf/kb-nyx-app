var assert = require('assert'),
    api = require('../api/calendarPhotos'),
    toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };

// example:
var assert = require("assert")
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
});

var nock = require('nock'),
    timeline_res_mock = require('../data/zeus/calendar_timeline_mock.js'),
    month_06_mock = require('../data/zeus/calendar_photos_06_mock.js'),
    month_10_mock = require('../data/zeus/calendar_photos_10_mock.js');

nock('http://zdev.kooboodle.com')
    .get('/photos/timeline')
    .reply(200, timeline_res_mock);
nock('http://zdev.kooboodle.com')
    .get('/photos?takenAfter=20130601&takenBefore=20130701&pageSize=5&currentPage=1')
    .reply(200, month_06_mock);
nock('http://zdev.kooboodle.com')
    .get('/photos?takenAfter=20131001&takenBefore=20131101&pageSize=5&currentPage=1')
    .reply(200, month_10_mock);

describe('Calendar', function(){
    describe('#getYear(req, res)', function(){
        it('should get month clusters of the given year', function(done){
            api.getYear({params:{year: '2013'}}, {headers: {cookie:''}})
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
    })
});