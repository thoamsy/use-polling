import usePolling from './index';

const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  return num > 0.8 ? 'done' : emojis[~~(num * 10)];
};

const letsPolling = usePolling(fakeAjax, 2000, res => res === 'done');

void (async function() {
  for await (const res of letsPolling()) {
    console.log(res);
  }
})();
