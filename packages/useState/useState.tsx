/*
 * @Author: huangying
 * @Date: 2022-01-19 16:52:09
 * @Last Modified by: huangying
 * @Last Modified time: 2022-07-14 11:13:14
 */

let states: any[] = []
let setters: Function[] = []
let count: number = 0
let isFirst: boolean = true

function useState(init) {
  if (isFirst) {
    states.push(init)
    setters.push(createState(count))
    isFirst = false
  }
  const state = states[count]
  const setState = setters[count]
  count++
  return [state, setState]
}

function createState(count: number) {
  return function (init) {
    states[count] = init
  }
}
