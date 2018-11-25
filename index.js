const curry = require('lodash.curry');
function usePolling(
  api,
  { cycleMs, predicate = () => true, customize = false },
) {
  if (typeof api !== 'function') {
    throw TypeError('You should pass a function as the first param.');
  }

  if (typeof cycleMs !== 'number') {
    throw TypeError('You should pass the ms for the cycle of polling.');
  }
  if (typeof predicate !== 'function') {
    throw TypeError('The predicate is used to determine when to exit polling');
  }

  const wait = () => new Promise(r => setTimeout(r, cycleMs));

  const pollingHelper = async function*() {
    while (true) {
      const res = await api();
      yield res;
      if (predicate(res)) {
        return res;
      }
      await wait();
    }
  };

  return customize
    ? pollingHelper
    : async fp => {
        for await (const res of pollingHelper()) {
          fp(res);
        }
      };
}

module.exports = curry(usePolling);
