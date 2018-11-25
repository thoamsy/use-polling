# 介绍

轮询在一些公司，一些没有推动 WebSocket 的公司，还是一个常用的套路。
但是，如果使用 `setInterval or setTimeout` 这种模式来写的话，总是要管理计时器，难免有些麻烦。
所以现在使用 Async Iterator 的概念，来包装一个简单的轮询工具。提升效率。

## 使用方式

```js
const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  return num > 0.8 ? 'done' : emojis[~~(num * 10)];
};

const letsPolling = usePolling(fakeAjax, 2000, res => res === 'done');

letsPolling(console.log);
```

## TODO

- [x] 使用 Babel 7 的 `async iterator` 来提升兼容性
- [ ] 一个可以提前中止轮询的方案

PS: 提前中止在目前的套路下，可能根本做不到。因为本来返回的就是一个 `async function`，
会自动转化成 Promise。这样就表示在 `for await of` 结束之前，这个返回的函数根本不可能运行。
所以，一个可能的方案因为是暴露一个**配置项**来判断，是需要自动做 `for await` 的操作，还是将
处理逻辑交给开发者自己。这样就能根据自己的意愿随时终止。
