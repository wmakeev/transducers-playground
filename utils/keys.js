var keys = function (keysArr) {
    keysArr = keysArr instanceof Array ? keysArr : [keysArr];
    return function (value) {
        return keysArr.reduce(function (res, key) {
            if (key && value) res.push(value[key]);
            return res;
        }, []).join('|');
    }
};

module.exports = keys;