# promise

## 特点


1. 对象的状态不受外部的影响，有三种状态 `pending` `fulfilled` `rejected`, 状态是无法改变的

2. 如果对象的状态发生了改变，就不会再变了，但是如果状态发生了改变，给对象添加回调函数，也会立刻得到结果


### 缺点

1.无法取消`promise`，一旦状态发生了改变，就无法取消

2.如果不设置回调函数，`peomise`内部发生错误，不会反应到外面

3.无法得知进行到哪个状态


## 用法

### 基本用法

```js
const promise = new Promise((resolve, reject) => {
  const randomNum = Math.random() * 10
  if (randomNum > 5) {
    resolve(randomNum)
  } else {
    reject(randomNum)
  }
})

promise.then(
  num => {
    console.log(num)
  },
  num => {
    console.log(num)
  }
)


```

`promise`接受两个参数，分别是`resolve`和`reject`,`resolve`会将`promise`的状态变为成功,
`reject`会将`promise`的状态变为失败，

`then`方法，接受两个回调函数作为参数，第一个在成功时调用，第二个在失败时调用

### promise嵌套

```js

const startTime = new Date()
const promise1 = new Promise((r, reject) => {
  setTimeout(() => reject(new Error('error')), 3000)
})

const promise2 = new Promise(r => {
  setTimeout(() => {
    r(promise1)
  }, 1000)
})

promise2
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    const endtTime = new Date()
    console.log(error)
    console.log(endtTime - startTime)
  })

```

当`promise2`种嵌套了另一个`promise1`， 当1s后`promise2`的状态发生改变并返回`promise1`,那么`promise2`的状态完全由`promise1`来决定，可以看出总共执行了3s，因为promise是立即执行的

### Promise.prototype.then()

`then`方法是定义在`promise.protptype`上的，当promise的状态改为`fulfilled`时会触发，
then方法采取链式调用，可以按照一定的顺序去调用回调函数，

```js
const p3 = new Promise(r => setTimeout(() => r(1), 100))
const p4 = new Promise(r => setTimeout(() => r(2), 100))

p3.then(() => p4)
  .then(r => console.log(r))
  .catch(err => console.log(err))

```

`promise`链式调用，将上一次`promise`的执行结果传给下一个

### Promise.prototype.catch()

#### `catch`方法，用于指定发生错误时候的回调函数

```js
Promise.then(null, () => console.log(1))

等价于

Promise.catch(() => console.log(1))
```

#### `catch`可以捕获到`promise`内部以任何形式抛出来的错误

```js
const p5 = new Promise((r, reject) => {
  r(y+1)
  throw new Error('p5内部报错了')
  reject(1)
})

p5.catch(e => console.log(`p5内部报错：${e}`))
```

#### `promise`一旦状态发生改变，就不会被捕获错误

```js
const p6 = new Promise(r => {
  r('ok')
  throw new Error('test')
})

p6.then(r => console.log(r)).catch(e => `p6报错了${e}`)

```

#### 当promise.then采取链式调用时可以在最后捕获所有错误

#### promise内部发生的错误，不出中断程序的运行，会在内部消化掉

```js
const p7 = new Promise(r => {
  r(y+1)
})

p7.then(res => console.log(res))
console.log('程序没有退出')

//程序没有退出
//(node:29414) UnhandledPromiseRejectionWarning: ReferenceError: y is not defined
```

### Promise.prototype.finally()

不管promise的结果是成功还是失败都会执行finally

### Promise.all()

```js
const p = Promise.all([p1, p2, p3])
```

等到`p1``p2``p3`的状态都为`fulfilled`时候，p的状态才会变为`fulfilled`，并且执行相应的回调


### Promise.race()

```js
const p = Promise.all([p1, p2, p3])
```

`p1``p2``p3`其中一个状态为`fulfilled`时候，p的状态就会变为`fulfilled`，并且执行相应的回调


### Promise.allSettled() 

```js
const p = Promise.all([p1, p2, p3])
```

`p1``p2``p3`全部返回时，无论`p1``p2``p3`的结果是成功还是失败，`p`的状态总是fulfilled


### Promise.any()

```js
const p = Promise.all([p1, p2, p3])
```

`p1``p2``p3`全部返回时，只要`p1``p2``p3`的状态只要有一个是`fulfilled`，`p`的状态总是fulfilled
