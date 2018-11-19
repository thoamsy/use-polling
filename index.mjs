export default function usePolling(api, cycleMs, predicate = () => true) {
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

  return async function*() {
    let res = null;
    while (true) {
      res = await api();
      if (predicate(res)) {
        break;
      }
      yield res;
      await wait();
    }
    yield res;
  };
}
