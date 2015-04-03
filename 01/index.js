var T = require('transduce');

var a = [
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


var res = T