import index from './lib/index';

const usePolling = index.default;
const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  return num > 0.8 ? 'done' : emojis[~~(num * 10)];
};

const pollingEmojis = usePolling(fakeAjax);
const letsPolling = pollingEmojis({
  cycleMs: 2000,
  predicate: res => res === 'done',
});

const stopPolling = letsPolling(console.log);
