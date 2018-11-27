"use strict";

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function usePolling(api, cycleMs) {
  if (typeof api !== 'function') {
    throw TypeError('You should pass a function as the first param.');
  }

  if (typeof cycleMs !== 'number') {
    throw TypeError('You should pass the ms for the cycle of polling.');
  }

  var timer = null;

  var wait = function wait(ms) {
    return new Promise(function (r) {
      return timer = setTimeout(r, ms);
    });
  };

  return [
  /*#__PURE__*/
  function () {
    var _polling = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return api.apply(void 0, _args);

            case 2:
              _context.next = 4;
              return wait(cycleMs);

            case 4:
              polling.apply(void 0, _args);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function polling() {
      return _polling.apply(this, arguments);
    };
  }(), function () {
    return clearTimeout(timer);
  }];
}

module.exports = usePolling;
