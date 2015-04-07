/**
 * router.spec
 * Date: 12.03.15
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

global.sinon  = require("sinon");
global.chai   = require("chai");

expect = chai.expect;
chai.use(require("sinon-chai"));

var log = require('../log'),
    title = log.title,
    info = log.info;

var T = require('transduce');

var isString = function (value) {
    return typeof value === 'string';
};

var isEven = function(n) { return n % 2 == 0; };

var add = function (value) {
    return value + 1;
};

describe('transducers', function () {

    describe('utils', function () {

        describe('keys', function () {
            var keys = require('../utils/keys');

            it('should create compose key', function () {
                var cases = [
                    {
                        keys    : 'ab',
                        value   : { a: 1 },
                        output  : ''
                    },
                    {
                        keys    : 'ab',
                        value   : { a: 1, ab: 3 },
                        output  : '3'
                    },
                    {
                        keys    : ['ab'],
                        value   : { a: 1, ab: 'some' },
                        output  : 'some'
                    },
                    {
                        keys    : ['ab', 'ba', 'cb', 'df'],
                        value   : { a: 1, ab: 'some', cb: null, df: undefined },
                        output  : 'some|||'
                    },
                    {
                        keys    : ['ab', 'ba', 'cb'],
                        value   : { ab: 'some', ba: '23', 'cb': 45 },
                        output  : 'some|23|45'
                    }
                ];

                cases.forEach(function (caseItem) {
                    var keysOn = keys.call(null, caseItem.keys);
                    expect(keysOn(caseItem.value)).to.be.eql(caseItem.output);
                })
            })
        });

        describe('switch-transform', function () {
            var switchTransform = require('../utils/switch-transform');

            it('should switch transform', function () {
                var xf = switchTransform(isString, {
                    true: T.map(function (value) {
                        return '|' + value + '|';
                    }),
                    false: T.map(add)
                });
                var res = T.into([], xf, [1, '23', 4, 56, '789', '10']);
                expect(res).to.be.eql([2, '|23|', 5, 57, '|789|', '|10|']);
            });

            it('should switch transform in composition', function () {
                var xf = T.compose(
                    T.take(7),
                    switchTransform(isEven, {
                        true: T.map(function (value) {
                            return value;
                        }),
                        false: T.map(function (value) {
                            return value - 1;
                        })
                    }),
                    T.remove(function (value) { return value === 4; }),
                    T.unique());

                var res = T.into([], xf, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

                expect(res).to.be.eql([0, 2, 6]);
            });

        })
    });

    //describe('parse-url', require('./parse-url'));
});