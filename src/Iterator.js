// 基础用法

const generatorIterator = array => {
  let nextIndex = 0

  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true }
    }
  }
}

const iterator = generatorIterator([1, 2, 3])

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 生成一个可以无限循环的数据结构

// const loopArray = {
//   i: 1,
//   [Symbol.iterator]() {
//     let num = this.i
//     return {
//       next: function () {
//         return {
//           value: num++,
//           done: false
//         }
//       }
//     }
//   }
// }

// const loopArr = [...loopArray]
// for (const n of loopArray) {
//   console.log(n)
// }

// 给一个类部署Interator接口

class RangeInterator {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    const { start, end } = this
    if (start >= end) {
      return {
        value: undefined,
        done: true
      }
    }
    return {
      value: this.start++,
      done: false
    }
  }
}

for (const a of new RangeInterator(0, 3)) {
  console.log(a)
}

// 对于类数组的数据结构（存在数值键名和length属性），部署 Iterator可以直接在 [Symbol.itorator]上引用数组的 Iterator接口

const sameArray = {
  0: 0,
  1: 1,
  2: 2,
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
}

for (const a of sameArray) {
  console.log(a)
}

// for...in会遍历原型链上的属性

// const rangeArr = [0, 1, 2]
// function Food() {
//   this.name = 'apple'
// }
// Food.prototype.color = 'red'

// rangeArr.__proto__ = Food.prototype

const rangeArr = {
  index: 1,
  [Symbol.iterator]() {
    const range = rangeArr
    return {
      next() {
        return {
          value: range.index++,
          done: false
        }
      },
      return() {
        console.log('break')
        return {
          done: true
        }
      }
    }
  }
}

for (const a of rangeArr) {
  if (a == 10) {
    return
  }
}
