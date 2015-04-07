/**
 * Terminator
 *
 * @param xf
 * @constructor
 */
var Terminator = function (xf) {
    this.xf = xf;
};
Terminator.prototype.init = function () {
    return this.xf.init();
};
Terminator.prototype.step = function (result, input) {
    return this.xf.step(result, input);
};
Terminator.prototype.result = function (result) {
    // stops result propagation
    return result;
};

var terminator = function (xf) {
    return new Terminator(xf);
};

/**
 * SwitchTransform
 *
 * @param selector
 * @param case_transforms
 * @param xf
 * @constructor
 */
var SwitchTransform = function (selector, case_transforms, xf) {
    this.xf = xf;
    this.selector = selector;
    this.cases_xf = {};
    for (var p in case_transforms) {
        if (case_transforms.hasOwnProperty(p)) {
            this.cases_xf[p] = case_transforms[p](terminator(xf));
        }
    }
};

SwitchTransform.prototype.init = function () {
    return this.xf.init();
};

SwitchTransform.prototype.step = function (result, input) {
    var key = this.selector(input);
    var case_xf = this.cases_xf[key];
    if (case_xf)
        return case_xf.step(result, input);
    else
        return this.xf.step(result, input);
};

SwitchTransform.prototype.result = function (result) {
    for (var p in this.cases_xf) {
        if (this.cases_xf.hasOwnProperty(p)) {
            result = this.cases_xf[p].result(result)
        }
    }
    return this.xf.result(result);
};

module.exports = function switchTransform(selector, transforms) {
    return function (xf) {
        return new SwitchTransform(selector, transforms, xf)
    }
};