import { useEffect, useRef } from 'react';

const delay = ms =>
  new Promise(r => {
    const timerId = setTimeout(() => r(timerId), ms);
  });

/**
 *
 * @param {() => Promise<any> | void)} callback 轮询逻辑
 * @param {number} interval 轮询间隔
 * @param {boolean} launch 是否开启轮询
 *
 * @returns {[number]} totalOfPolling 轮询总次数
 */
const usePolling = (callback, interval, launch) => {
  const tick = useRef();
  const needToLaunch = useRef();
  const totalOfPolling = useRef(0);

  useEffect(() => {
    tick.current = callback;
    // 因为递归代码中，无法通过闭包拿到最新的状态，所以需要使用 ref 来读取
    needToLaunch.current = launch;
  }, [callback, launch]);

  useEffect(() => {
    let timer;
    let isMount = true;
    totalOfPolling.current = 0;
    function polling(callback, interval) {
      if (!(needToLaunch.current && isMount)) return;
      return Promise.resolve(callback())
        .then(
          // 这里不用 finally，因为 finally 的返回值是上一个 promise 的结果，导致下一个 then 拿不到 id
          () => {
            totalOfPolling.current += 1;
            return delay(interval);
          },
          () => {
            totalOfPolling.current += 1;
            return delay(interval);
          },
        )
        .then(id => {
          timer = id;
          return polling(callback, interval);
        });
    }
    launch && polling(tick.current, interval);
    return () => {
      isMount = false;
      clearTimeout(timer);
    };
  }, [interval, launch]);
  return [totalOfPolling.current];
};

module.exports = usePolling;
