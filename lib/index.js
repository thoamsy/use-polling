"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

  function polling() {
    return _polling.apply(this, arguments);
  }

  function _polling() {
    _polling = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
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
    return _polling.apply(this, arguments);
  }

  return [polling, function () {
    return clearTimeout(timer);
  }];
}

module.exports = usePolling;
