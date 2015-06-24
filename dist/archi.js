(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global){
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

var archi = {
  calc: function (num) {
    return new ArchiNumber(num);
  }
};

if (process.browser) {
  global.archi = archi;
}

module.exports = archi;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":2,"poser":3}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
var poser = require('./src/node');

module.exports = poser;

['Array', 'Function', 'Object', 'Date', 'String'].forEach(pose);

function pose (type) {
  poser[type] = function poseComputedType () { return poser(type); };
}

},{"./src/node":4}],4:[function(require,module,exports){
(function (global){
'use strict';

var d = global.document;

function poser (type) {
  var iframe = d.createElement('iframe');

  iframe.style.display = 'none';
  d.body.appendChild(iframe);

  return map(type, iframe.contentWindow);
}

function map (type, source) { // forward polyfills to the stolen reference!
  var original = window[type].prototype;
  var value = source[type];
  var prop;

  for (prop in original) {
    value.prototype[prop] = original[prop];
  }

  return value;
}

module.exports = poser;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcG9zZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcG9zZXIvc3JjL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBBcmNoaU51bWJlciA9IHJlcXVpcmUoJ3Bvc2VyJykoJ051bWJlcicpO1xuXG5BcmNoaU51bWJlci5wcm90b3R5cGUucGx1cyA9IGZ1bmN0aW9uIChudW0pIHtcbiAgdmFyIG51bTEgPSArdGhpcztcbiAgdmFyIG51bTIgPSArbnVtO1xuICB2YXIgZmFjdG9yID0gZ2V0TWF4RmFjdG9yKG51bTEsIG51bTIpO1xuXG4gIHJldHVybiBuZXcgQXJjaGlOdW1iZXIoKChudW0xICogZmFjdG9yKSArIChudW0yICogZmFjdG9yKSkgLyBmYWN0b3IpO1xufTtcblxuQXJjaGlOdW1iZXIucHJvdG90eXBlLm1pbnVzID0gZnVuY3Rpb24gKG51bSkge1xuICB2YXIgbnVtMSA9ICt0aGlzO1xuICB2YXIgbnVtMiA9ICtudW07XG4gIHZhciBmYWN0b3IgPSBnZXRNYXhGYWN0b3IobnVtMSwgbnVtMik7XG5cbiAgcmV0dXJuIG5ldyBBcmNoaU51bWJlcigoKG51bTEgKiBmYWN0b3IpIC0gKG51bTIgKiBmYWN0b3IpKSAvIGZhY3Rvcik7XG59O1xuXG5BcmNoaU51bWJlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24gKG51bSkge1xuICB2YXIgbnVtMSA9ICt0aGlzO1xuICB2YXIgbnVtMiA9ICtudW07XG4gIHZhciBmYWN0b3IgPSBnZXRNYXhGYWN0b3IobnVtMSwgbnVtMik7XG5cbiAgcmV0dXJuIG5ldyBBcmNoaU51bWJlcigobnVtMSAqIGZhY3RvcikgJSAobnVtMiAqIGZhY3RvcikpO1xufTtcblxuZnVuY3Rpb24gZ2V0TWF4RmFjdG9yKG51bTEsIG51bTIpIHtcbiAgcmV0dXJuIE1hdGgubWF4KGdldEZhY3RvcihudW0xKSwgZ2V0RmFjdG9yKG51bTIpKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVjaW1hbHMobnVtKSB7XG4gIHZhciBudW1TdHIgPSBudW0udG9TdHJpbmcoKTtcbiAgdmFyIHBvaW50SW5kZXggPSBudW1TdHIuaW5kZXhPZignLicpO1xuICB2YXIgZGVjaW1hbHMgPSBwb2ludEluZGV4ID09PSAtMSA/IDAgOiBudW1TdHIubGVuZ3RoIC0gbnVtU3RyLmluZGV4T2YoJy4nKSAtIDE7XG5cbiAgcmV0dXJuIGRlY2ltYWxzO1xufVxuXG5mdW5jdGlvbiBnZXRGYWN0b3IobnVtKSB7XG4gIHZhciBkZWNpbWFscyA9IGdldERlY2ltYWxzKG51bSk7XG4gIHZhciBmYWN0b3IgPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuXG4gIHJldHVybiBmYWN0b3I7XG59XG5cbnZhciBhcmNoaSA9IHtcbiAgY2FsYzogZnVuY3Rpb24gKG51bSkge1xuICAgIHJldHVybiBuZXcgQXJjaGlOdW1iZXIobnVtKTtcbiAgfVxufTtcblxuaWYgKHByb2Nlc3MuYnJvd3Nlcikge1xuICBnbG9iYWwuYXJjaGkgPSBhcmNoaTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcmNoaTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIHBvc2VyID0gcmVxdWlyZSgnLi9zcmMvbm9kZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc2VyO1xuXG5bJ0FycmF5JywgJ0Z1bmN0aW9uJywgJ09iamVjdCcsICdEYXRlJywgJ1N0cmluZyddLmZvckVhY2gocG9zZSk7XG5cbmZ1bmN0aW9uIHBvc2UgKHR5cGUpIHtcbiAgcG9zZXJbdHlwZV0gPSBmdW5jdGlvbiBwb3NlQ29tcHV0ZWRUeXBlICgpIHsgcmV0dXJuIHBvc2VyKHR5cGUpOyB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCA9IGdsb2JhbC5kb2N1bWVudDtcblxuZnVuY3Rpb24gcG9zZXIgKHR5cGUpIHtcbiAgdmFyIGlmcmFtZSA9IGQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuXG4gIHJldHVybiBtYXAodHlwZSwgaWZyYW1lLmNvbnRlbnRXaW5kb3cpO1xufVxuXG5mdW5jdGlvbiBtYXAgKHR5cGUsIHNvdXJjZSkgeyAvLyBmb3J3YXJkIHBvbHlmaWxscyB0byB0aGUgc3RvbGVuIHJlZmVyZW5jZSFcbiAgdmFyIG9yaWdpbmFsID0gd2luZG93W3R5cGVdLnByb3RvdHlwZTtcbiAgdmFyIHZhbHVlID0gc291cmNlW3R5cGVdO1xuICB2YXIgcHJvcDtcblxuICBmb3IgKHByb3AgaW4gb3JpZ2luYWwpIHtcbiAgICB2YWx1ZS5wcm90b3R5cGVbcHJvcF0gPSBvcmlnaW5hbFtwcm9wXTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3NlcjtcbiJdfQ==
