'use strict';

var test = require('tape');
var calc = require('..').calc;

test('plus', function (t) {
  t.equal(+calc(1).plus(2), 3);
  t.equal(+calc(0.1).plus(0.2), 0.3);
  t.equal(+calc(0.123).plus(0.4567), 0.5797);

  t.end();
});

test('minus', function (t) {
  t.equal(+calc(2).minus(1), 1);
  t.equal(+calc(0.3).minus(0.1), 0.2);
  t.equal(+calc(0.456).minus(0.1234), 0.3326);
  t.equal(+calc(-1.34).minus(2.123), -3.463);

  t.end();
});

test('mod', function (t) {
  t.equal(+calc(2).mod(2), 0);
  t.equal(+calc(3).mod(2), 1);
  t.equal(+calc(0.3).mod(0.2), 1);
  t.equal(+calc(0.3).mod(0.1), 0);

  t.end();
});

test('composed calc', function (t) {
  t.equal(+calc(0.1).plus(0.2).minus(0.1), 0.2);
  t.equal(+calc(0.1).plus(0.1).plus(0.1), 0.3);
  t.equal(+calc(0.1).plus(0.1).mod(0.1), 0);

  t.end();
});
