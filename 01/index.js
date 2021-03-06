var _ = require('lodash');
var T = require('transduce');
var t = require('transducers-js');


var log = require('../log'),
    title = log.title,
    info = log.info;

var data = [
    { name: 'Яблоки'   , quantity: 2, uuid: '123', flag: true , order: '12345', user: 'Вася', age: 23, arr: [1,2]    },
    { name: 'Бананы'   , quantity: 4, uuid: '124', flag: true , order: '12346', user: 'Вася', age: 20, arr: [3,4]    },
    { name: 'Апельсины', quantity: 2, uuid: '125', flag: false, order: '12347', user: 'Петя', age: 23, arr: [5]      },
    { name: 'Мандарины', quantity: 2, uuid: '126'             , order: '12348', user: 'Вася', age: 23, arr: 6        },
    { name: 'Мандарины', quantity: 1, uuid: '127', flag: true , order: 123    , user: 'Вася', age: 18, arr: "7"      },
    { name: 'Мандарины', quantity: 1             , flag: true , order: '12350', user: 'Вася', age: 23, arr: [8, "9"] },
    { name: 'Арбузы'   , quantity: 5, uuid: '128', flag: true , order: '12351'                       , arr: [10]     },
    { name: 'Арбузы'   , quantity: 3, uuid: '129', flag: false, order: '12352', user: 'Вася', age: 10                },
    { name: 'Манго'    , quantity: 6, uuid: '130', flag: true , order: '12353', user: 'Вася', age: 23, arr: 11       }
];

var res;

//// Extend
//title('transduce.into({}, data)');
//res = T.into({}, data);
//info(res);
//
//// Copy
//title('transduce.into([], data)');
//res = T.into([], data);
//info(res);

var xf = _.compose(T.cat, T.tap(function (res, item) {
    this.i = this.i || 0;
    title(this.i++);
    info({
        result: res,
        input: item
    });
}));

//
title('transduce_js.into({}, data)');
res = T.into({}, xf, data);
info(res);

//
title('partitionByKeys');
var keys = require('../utils/keys');
var partitionByKeys = _.compose(T.partitionBy, keys);
res = T.into([], partitionByKeys(['name', 'user']), data);
info(res);




