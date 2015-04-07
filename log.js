var colors = require('colors');
var prettyjson = require('prettyjson');

exports.title = function (msg) {
    console.log(''.black);
    console.log((msg).toString().bold.underline.blue);
};

exports.info = function (msg) {
    console.log(prettyjson.render(msg));
};