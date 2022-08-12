import { useReducer, useEffect, useState, useRef } from 'react'
const ReducerPage = () => {
  const [num1, changeNum1] = useState(0)
  const [num2, changeNum2] = useState(0)
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return state + 1
      case 'reduce':
        alert(`reducer reduce ${state}`)
        return state - 1
      default:
        return 0
    }
  }
  const [num, dispatch] = useReducer(reducer, 0)

  const isMount = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'add' })
    }, 2000)
  }, [dispatch])

  useEffect(() => {
    const id = setInterval(() => {
      changeNum1((e) => e + 1)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])
  useEffect(() => {
    async function a() {
      await setInterval(() => {
        changeNum2((e) => e + 1)
      }, 1000)
    }
    a()
  }, [])

  useEffect(() => {
    console.log(`useEffect num, ${num}`)
    if (isMount.current) {
      console.log('update')
    } else {
      isMount.current = true
    }
  }, [num])

  const reduce = () => {
    setTimeout(() => {
      // 打印渲染时的值
      alert(`reduce ${num}`)
      dispatch({ type: 'reduce' })
    }, 3000)
  }
  const add = () => {
    dispatch({ type: 'add' })
  }
  return (
    <div>
      num: {num} / num1: {num1} / num2: {num2}
      <input type="button" value="reduce" onClick={reduce} />
      <input type="button" value="add" onClick={add} />
    </div>
  )
}
export default ReducerPage
