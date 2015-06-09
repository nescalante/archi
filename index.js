'use strict';

var ArchiNumber = require('poser')('Number');

ArchiNumber.prototype.plus = function (num) {
  var num1 = +this;
  var num2 = +num;
  var factor = getMaxFactor(num1, num2);

  return new ArchiNumber(((num1 * factor) + (num2 * factor)) / factor);
};

ArchiNumber.prototype.minus = function (num) {
  var num1 = +this;
  var num2 = +num;
  var factor = getMaxFactor(num1, num2);

  return new ArchiNumber(((num1 * factor) - (num2 * factor)) / factor);
};

ArchiNumber.prototype.mod = function (num) {
  var num1 = +this;
  var num2 = +num;
  var factor = getMaxFactor(num1, num2);

  return new ArchiNumber((num1 * factor) % (num2 * factor));
};

function getMaxFactor(num1, num2) {
  return Math.max(getFactor(num1), getFactor(num2));
}

function getDecimals(num) {
  var numStr = num.toString();
  var pointIndex = numStr.indexOf('.');
  var decimals = pointIndex === -1 ? 0 : numStr.length - numStr.indexOf('.') - 1;

  return decimals;
}

function getFactor(num) {
  var decimals = getDecimals(num);
  var factor = Math.pow(10, decimals);

  return factor;
}

module.exports = {
  calc: function (num) {
    return new ArchiNumber(num);
  }
};
