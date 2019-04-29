"use strict";

var _react = require("react");

var delay = function delay(ms) {
  return new Promise(function (r) {
    var timerId = setTimeout(function () {
      return r(timerId);
    }, ms);
  });
};
/**
 *
 * @param {() => Promise<any> | void)} callback 轮询逻辑
 * @param {number} interval 轮询间隔
 * @param {boolean} launch 是否开启轮询
 *
 * @returns {[number]} totalOfPolling 轮询总次数
 */


var usePolling = function usePolling(callback, interval, launch) {
  var tick = (0, _react.useRef)();
  var needToLaunch = (0, _react.useRef)();
  var totalOfPolling = (0, _react.useRef)(0);
  (0, _react.useEffect)(function () {
    tick.current = callback; // 因为递归代码中，无法通过闭包拿到最新的状态，所以需要使用 ref 来读取

    needToLaunch.current = launch;
  }, [callback, launch]);
  (0, _react.useEffect)(function () {
    var timer;
    var isMount = true;
    totalOfPolling.current = 0;

    function polling(callback, interval) {
      if (!(needToLaunch.current && isMount)) return;
      return Promise.resolve(callback()).then( // 这里不用 finally，因为 finally 的返回值是上一个 promise 的结果，导致下一个 then 拿不到 id
      function () {
        totalOfPolling.current += 1;
        return delay(interval);
      }, function () {
        totalOfPolling.current += 1;
        return delay(interval);
      }).then(function (id) {
        timer = id;
        return polling(callback, interval);
      });
    }

    launch && polling(tick.current, interval);
    return function () {
      isMount = false;
      clearTimeout(timer);
    };
  }, [interval, launch]);
  return [totalOfPolling.current];
};

module.exports = usePolling;
