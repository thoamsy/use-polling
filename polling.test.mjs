import usePolling from './lib/index';

const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  const res = num > 0.8 ? 'done' : emojis[~~(num * 10)];
  console.log(res);
};

const [getEmojis, stop] = usePolling(fakeAjax, 1000);
setTimeout(() => stop(), 3000);
getEmojis();
