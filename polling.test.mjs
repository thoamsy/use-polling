import usePolling from './lib/index';

const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  return num > 0.8 ? 'done' : emojis[~~(num * 10)];
};

const pollingEmojis = usePolling(fakeAjax);
const letsPolling = pollingEmojis({
  cycleMs: 1000,
  predicate: res => res === 'done',
  customize: true,
});

void (async function foo() {
  const iter = letsPolling();
  let { value, done } = await iter.next();
  for (let i = 0; i < 2 && !done; i += 1) {
    console.log(value);
    ({ value, done } = await iter.next());
  }
})();
