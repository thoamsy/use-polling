## 使用说明

本 hooks 支持简单的轮询功能。

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
  usePolling(
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

`callback: (totalOfPolling" number) => Promise<any>|void`

轮询逻辑，返回一个 promise。不过如果你需要的话，也可以传非 Promise，仅仅做一个计时器的功能。同时会回传
当前的轮询次数作为检查用。

`interval: number`

轮询周期

`launch: boolean = false`

是否开启轮询。用户应该使用 state 来主动控制它

```jsx
const [launch, setLaunch] = useState(true);
usePolling(
  total => {
    if (total > 50) {
      return setLaunch(false);
    }
  },
  1000,
  launch
);
```

## 说明

本 hooks 完全将主动权交给用户自己，而不是由 hooks 控制大部分逻辑。比如你需要传递一个 state 用来告诉
hooks 是否开启轮询，也要在停止轮询的时候，手动去将这个 state 调整。

这样的好处是用户拥有非常高的主动权，hooks 仅仅只是帮它做了轮询的一层封装。
当然，我们可能会期望 hooks 能返回一个函数，比如叫 `startPolling`，让我们主动触发轮询，同样的提供一个方法 `stopPolling` 来做相反的事情。
但如果是这样的话，hooks 就必须检测你传进去的的第一个参数，并在该参数改变的时候进行更新。但因为我们偏爱于写内联函数，也就意味着这个参数每次都是全新的，这样就会导致每次返回的 `startPolling` 也是全新的。而其他依赖到这个函数的组件或者 hooks 都将因为 dep array 的不同，失去性能优化的机会。

NOTE: 请不要动态修改 interval，现在不支持在 interval 修改的时候自动清理之前的回调。如果需要的话，我可以尝试支持下 🌚

