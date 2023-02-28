### reduce 概念

- reduce() 方法对数组中的每个元素按序执行一个由您提供的 reducer
  函数，每一次运行 reducer，会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

- 第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0
  的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值
  initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。

### 语法

```
  arr.reduce(callback, [initialValue])
```

### 参数

#### callback

- previousValue：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
- currentValue：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
- currentIndex：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
- array：用于遍历的数组

#### initialValue 可选

- 作为第一次调用 callback 的第一个参数
- 数组为空时 没有 initialValue 时会报错 TypeError

```
  // 没有初始值的时候，currentIndex从1开始，循环1次
  const onClick1 = () => {
    const res1 = [1, 2].reduce(
      (previousValue, currentValue, currentIndex, array) => {
        // 0 1次
        console.log(`currentIndex: ${currentIndex}`)
        return previousValue + currentValue
      }
    )
    // 3
    console.log(res1)
  }
  // 有初始值的时候，currentIndex从0开始，循环2次
  const onClick = () => {
    const res2 = [1, 2].reduce(
      (previousValue, currentValue, currentIndex, array) => {
        // 0/1 2次
        console.log(`currentIndex: ${currentIndex}`)
        return previousValue + currentValue
      },
      0
    )
    // 3
    console.log(res2)
  }
```

- reduce 不会直接改变调用它的对象，但对象可被调用的 callbackfn 所改变。
  遍历的元素范围是在第一次调用 callbackfn 之前确定的。所以即使有元素在调用开始后被追加到数组中，这些元素也不会被 callbackfn 访问。如果数组现有的元素发生了变化，传递给 callbackfn 的值将会是元素被 reduce 访问时的值（即发生变化后的值）；在调用 reduce 开始后，尚未被访问的元素若被删除，则其将不会被 reduce 访问。

```
  const onClick2 = () => {
    // 没有初始值的时候，currentIndex从1开始，只能改变index 2以后的数据
    const res1 = [1, 2, 3].reduce(
      (previousValue, currentValue, currentIndex, array) => {
        array[1] = 100 // ❌
        array[2] = 50 // 🉑️
        return previousValue + currentValue
      }

    const arr = [1, 2, 3]
    // 有初始值的时候，currentIndex从0开始，只能改变index 1以后的数据
    const res2 = arr.reduce(
      (previousValue, currentValue, currentIndex, array) => {
        array[1] = 100 // 🉑️
        array[2] = 50 // 🉑️
        return previousValue + currentValue
      },
      0
    )
    // [1, 100, 50], 53, 151
    console.log(arr, res1, res2)
  }
  // 改变数据长度无法被遍历到
  const onClick3 = () => {
    const arr = [1, 2, 3]
    const res = arr.reduce(
      (previousValue, currentValue, currentIndex, array) => {
        if (currentIndex == 0) {
          array.push(100)
        }
        // 0 1 2  循环三次
        console.log(`currentIndex: ${currentIndex}`)
        return previousValue + currentValue
      },
      0
    )
    // [1, 2, 3, 100] 6
    console.log(arr, res)

  // 可以删除元素
  const onClick4 = () => {
    const arr = [1, 2, 3, 4, 5]
    const res = arr.reduce(
      (previousValue, currentValue, currentIndex, array) => {
        if (currentIndex == 0) {
          array.pop()
        }
        // 0 1 2 3 循环四次
        console.log(` currentIndex: ${currentIndex}`)
        return previousValue + currentValue
      },
      0
    )
    // [1, 2, 3, 4] 10
    console.log(arr, res)
  }
```

### 一些使用场景

#### 处理数据 常见的可以从数组变成对象

```
  const arr = [
    { code: 'a', value: '1' },
    { code: 'b', value: '2' },
    { code: 'c', value: '3' },
  ]
  const res = arr.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      previousValue[currentValue.code] = currentValue.value
      return previousValue
    },
    {}
  )
  // {a: '1', b: '2', c: '3'}
  console.log(res)
```

#### 数组去重

```
  const arr = [1, 2, 2, 5, 6, 7, 5, 1]
  const res = arr.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      if (!previousValue.includes(currentValue)) {
        previousValue.push(currentValue)
      }
      return previousValue
    },
    []
  )
  // [1, 2, 5, 6, 7]
  console.log(res)
```

#### 替换.filter().map()

```
  // 过滤show 并且组装成新的数据
  const arr = [
    { code: 'a', value: 1, show: true },
    { code: 'b', value: 2, show: false },
    { code: 'c', value: 3, show: true },
  ]
  const res = arr.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      if (currentValue?.show) {
        previousValue.push({
          ...currentValue,
          value: currentValue.value * 2,
        })
      }
      return previousValue
    },
    []
  )
  const res2 = arr
    .filter((item) => item.show)
    .map((item) => {
      return { ...item, value: item.value * 2 }
    })
  // [{code: 'a', value: 2, show: true}, {code: 'c', value: 6, show: true}]
  console.log(res, res2)
```

#### 按顺序组合函数

```
  // 比如加减乘除计算, 复杂的数据可以更清晰地视线逻辑
  const plus = (v) => {
    return v + 2
  }
  const sub = (v) => {
    return v - 8
  }
  const mul = (v) => {
    return v * 4
  }
  const div = (v) => {
    return v / 2
  }
  const arr = [plus, sub, mul, div]
  const computed = (value) =>
    arr.reduce((previousValue, currentValue, currentIndex, array) => {
      return currentValue(previousValue)
    }, value)
  // 8 24 48
  console.log(computed(10), computed(18), computed(30))
```

#### 某些场景需要依靠后端处理数据

```
  const plus = (v) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v + 2)
      }, 100)
    })
  }
  const sub = (v) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v - 8)
      }, 1000)
    })
  }
  const mul = (v) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v * 4)
      }, 100)
    })
  }
  const div = (v) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(v / 2)
      }, 100)
    })
  }
  const arr = [plus, sub, mul, div]
  const computed = async (value) => {
    return arr.reduce(
      async (previousValue, currentValue, currentIndex, array) => {
        const res = await currentValue(await previousValue)
        return res
      },
      Promise.resolve(value)
    )
  }
  const res = await computed(10)
  const res1 = await computed(18)
  const res2 = await computed(30)
  // 8 24 48
  console.log(res, res1, res2)
```

### 与其他函数对比

```
  // for
  const arr = new Array(10000000).fill(0)
  console.time('for')
  let num1 = 0
  for (let i = 0; i < arr.length; i++) {
    num1 = num1 + i
  }
  console.timeEnd('for')
  // forEach
  console.time('forEach')
  let num2 = 0
  arr.forEach((e, i) => {
    num2 = num2 + i
  })
  console.timeEnd('forEach')
  // map
  console.time('map')
  let num3 = 0
  arr.map((e, i) => {
    num3 = num3 + i
  })
  console.timeEnd('map')
  // reduce
  console.time('reduce')
  let num4 = arr.reduce((pre, current, i, arr) => {
    return pre + i
  }, 0)
  console.timeEnd('reduce')
  // console.log(num1, num2, num3, num4)
```

#### 执行 2 次的对比

![image](https://user-images.githubusercontent.com/20376461/221807310-dc1c068d-9a8a-433f-824c-6564499c8f2f.png)
