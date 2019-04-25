# 介绍

轮询在一些公司，一些没有推动 WebSocket 的公司，还是一个常用的套路。

虽然轮询的实现难度不大，但是经常写难免会觉得无聊。

本库采用一个十分简单的递归来做到，**无限轮询**。使用方式类似于 React 的 `useState` Hooks 类 API

## 快速开始

```jsx
const delay = ms => new Promise(r => setTimeout(r, ms));
const emojis = Array.from('🌚🌝👀😎😂😏🙁🤠');
const api = () =>
  delay(600).then(() => {
    const num = Math.random();
    if (num > 0.2) {
      return emojis[~~(num * emojis.length)];
    } else {
      throw Error('foobar');
    }
  });

const Demo = () => {
  const [data, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [startPolling, setPolling] = useState(false);
  const [count] = usePolling(
    () => {
      setError(null);
      return api().then(setRes, setError);
    },
    2000,
    startPolling
  );

  const onClick = () => {
    setPolling(c => !c);
  };

  return (
    <div>
      <button onClick={onClick}>
        {startPolling ? '停止轮询' : '点击我开启轮询'}
      </button>
      {error ? <p>you has error: {error.message}</p> : <p>{data}</p>}
    </div>
  );
};
```

## 参数说明

`callback: () => Promise<any>`

轮询逻辑，返回一个 promise

`interval: number`

轮询周期

`launch: boolean = false`

是否开启轮询。用户应该使用 state 来主动控制它

## 返回值

`[totalOfPolling]: [number]` 轮询的次数，在某些情况下可以根据这个来觉得是否终止轮询。比如

```jsx
const [launch, setLaunch] = useState(true);
const [count] = usePolling(callback, 1000, launch);
useEffect(() => count > 50 && setLaunch(false), [count]);
```

## 说明

本 hooks 完全将主动权交给用户自己，而不是由 hooks 控制大部分逻辑。比如你需要传递一个 state 用来告诉
hooks 是否开启轮询，也要在停止轮询的时候，手动去将这个 state 调整。

这样的好处是用户拥有非常高的主动权，hooks 仅仅只是帮它做了轮询的一层封装。
当然，我们可能会期望 hooks 能返回一个函数，比如叫 `startPolling`，让我们主动触发轮询，同样的提供一个方法 `stopPolling` 来做相反的事情。
但如果是这样的话，hooks 就必须检测你传进去的的第一个参数，并在该参数改变的时候进行更新。但因为我们偏爱于写内联函数，也就意味着这个参数每次都是全新的，这样就会导致每次返回的 `startPolling` 也是全新的。而其他依赖到这个函数的组件或者 hooks 都将因为 dep array 的不同，失去性能优化的机会。

NOTE: 请不要动态修改 interval，现在不支持在 interval 修改的时候自动清理之前的回调。如果需要的话，我可以尝试支持下 🌚

