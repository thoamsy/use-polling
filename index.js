function usePolling(api, cycleMs) {
  if (typeof api !== 'function') {
    throw TypeError('You should pass a function as the first param.');
  }

  if (typeof cycleMs !== 'number') {
    throw TypeError('You should pass the ms for the cycle of polling.');
  }

  let timer = null;
  const wait = ms => new Promise(r => (timer = setTimeout(r, ms)));

  async function polling(...args) {
    await api(...args);
    await wait(cycleMs);
    polling(...args);
  }
  return [polling, () => clearTimeout(timer)];
}

module.exports = usePolling;
