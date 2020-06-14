# `Iterator` 迭代器

## `Iterator`是什么

>遍历器（`Iterator`）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 `Iterator` 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。转自[ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/iterator#`Iterator`%EF%BC%88%E9%81%8D%E5%8E%86%E5%99%A8%EF%BC%89%E7%9A%84%E6%A6%82%E5%BF%B5)

`Iterator`的遍历过程：

创建一个指针对象，指向当前数据结构的起始位置，每次调用对象的Next方法，使指针对象指向下一位，直到他指向数据结构的下一位

`Iterator`实际上只是在数据结构之上提供了一个接口，遍历器和它所要遍历的那个数据结构是分开的，即使没有所对应的数据结构或者说可以用遍历器模拟出数据结构

下面带着问题来了解一下`Iterator`

1. 如何创造出一个无限循环的数据结构？

2. ['a', new Set([1, 2])] 如何遍历取出每一项呢？

## 默认的Interator接口


```js
const loopArray = {
  i: 1,
  [Symbol.iterator]() {
    let num = this.i
    return {
      next: function () {
        return {
          value: num++,
          done: false
        }
      }
    }
  }
}

// const loopArr = [...loopArray]
for (const n of loopArray) {
  console.log(n)
}
```

ES6规定，默认的`Iterator`部署在数据结构的[Symbol.iterator]上，一个数据结构只要有
[Symbol.iterator]就可以认为这个数据结构是一个可遍历的数据结构

ES6的某些数据结构原生具备`Iterator`接口, 不需要任何处理就可以被 for...of..遍历，原因在于这些数据结构上已经原生部署了[Symbol.iterator]属性

原声具备[Symbol.iterator]的数据结构有：

* Map
* Set
* Array
* String
* 函数的 arguments 对象
* NodeList

对象(Object)之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定，需要开发者手动指定。

### 一个对象如果要具备能被`for...of`循环调用的Iterator接口，就必须在[Symbol.iterator]属性上部署遍历器生成方法(原型链上的对象具有该方法也可以)

### 下面是给一个类部署Iterator接口

```js
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

```

###  对于类数组的数据结构（存在数值键名和length属性），部署 Iterator可以直接在 [Symbol.itorator]上引用数组的 Iterator接口

```js
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
```

### for...of与其他遍历语法的比较

* 原始的for循环 

* 数组提供的for each 这种无法跳出循环

* for...in 有几个缺点

	1. for...in遍历数组所输出的键名是以字符串的形式

	2. for...in会遍历原型链上的属性

	```js
	const rangeArr = [0, 1, 2]
	function Food() {
  		this.name = 'apple'
	}
	Food.prototype.color = 'red'

	rangeArr.__proto__ = Food.prototype

	for(let key in rangeArr) {
  		console.log(key, typeof key)
	}
	
	0 string
	1 string
	2 string
	color string
	```
	
	* 某些情况下，for...in循环会以任意顺序遍历键名。

### for...of的优势

1. 有着和for...in一样简洁用法

2. 可以使用break，continue， return跳出循环

3. 提供了遍历所有数据结构的统一操作接口。	

