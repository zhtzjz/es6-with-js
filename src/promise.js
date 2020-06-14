// 基本用法

// const promise = new Promise((resolve, reject) => {
//   const randomNum = Math.random() * 10
//   if (randomNum > 5) {
//     resolve(randomNum)
//   } else {
//     reject(randomNum)
//   }
// })

// promise.then(
//   num => {
//     console.log(num)
//   },
//   num => {
//     console.log(num)
//   }
// )

// promise嵌套
// const startTime = new Date()
// const promise1 = new Promise((r, reject) => {
//   setTimeout(() => reject(new Error('error')), 3000)
// })

// const promise2 = new Promise(r => {
//   setTimeout(() => {
//     r(promise1)
//   }, 1000)
// })

// setInterval(() => {
//   console.log(promise2)
// }, 500)

// promise2
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => {
//     const endtTime = new Date()
//     console.log(error)
//     console.log(endtTime - startTime)
//   })

// promise链式调用

// const p3 = new Promise(r => setTimeout(() => r(1), 100))
// const p4 = new Promise(r => setTimeout(() => r(2), 100))

// p3.then(() => p4)
//   .then(r => console.log(r))
//   .catch(err => console.log(err))

// promise.catch
// Promise.then(null, () => console.log(1))
// Promise.catch(() => console.log(1))

// promise可以捕获任何错误

// const p5 = new Promise((r, reject) => {
//  g
// })

// p5.catch(e => console.log(`p5内部报错：${e}`))

// const p6 = new Promise(r => {
//   r('ok')
//   throw new Error('test')
// })

// p6.then(r => console.log(r)).catch(e => `p6报错了${e}`)

// promise内部的错误不会导致进程中断

// const p7 = new Promise(r => {
//   r(y+1)
// })

// p7.then(res => console.log(res))
// console.log('程序没有退出')



// promise.race

const racePromises = Array.from({length: 3}, (_, i)=> new Promise(
  (r, reject) =>
    {
      if(i === 1) {
        reject(`报错${i}`)
      }
      r(i)
    }
  )
)

Promise.race(racePromises)
  .then(r=>console.log(r))
  .catch(error=>console.log(error))

 
// promise.allSettled

const allSettledPromise = Array.from({length: 3}, (_, i)=> new Promise(
  (_, reject) =>
    {
      if(i === 1) {
        setTimeout(()=>  reject(i), 3000)
      }
      reject(i)
    }
  )
)

Promise.allSettled(allSettledPromise).then(r => console.log(r))