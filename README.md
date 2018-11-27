# 介绍

轮询在一些公司，一些没有推动 WebSocket 的公司，还是一个常用的套路。

虽然轮询的实现难度不大，但是经常写难免会觉得无聊。

本库采用一个十分简单的递归来做到，**无限轮询**。使用方式类似于 React 的 `useState` Hooks 类 API

## 概要

```js
const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const fakeAjax = () => {
  const num = Math.random();
  const res = num > 0.8 ? 'done' : emojis[~~(num * 10)];
  console.log(res);
};

const [getEmojis, stop] = usePolling(fakeAjax, 1000);
setTimeout(stop, 3000);
getEmojis();

// 会在 3s 后结束 console.log
```

## API

```js
usePolling(
  api: (any) => void,
  cycleMs: Number
): [pollingApi: (any) => void, stopPolling: () => void]
```

## 限制

目前传递给 `usePolling` 的函数要求将所有的逻辑提前写好。
类似于如果在 React 中，你需要这样

```js
const ajax = () => {
  const res = await fetchSomething();
  const data = derivedDataFromRes(res);

  this.setState(data);
};

const [letsPolling, stop] = usePolling(ajax);
```

## TODO

- [ ] English Docs
