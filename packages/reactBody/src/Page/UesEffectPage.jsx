import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useCallback } from 'react'
import usePrevious from '../hooks/usePrevious'

const UesEffectPage = () => {
  const [num0, changeNum0] = useState(0)
  const [inputValue, handleInputValue] = useState('')
  const pre = useRef(0)
  const pre1 = useRef(0)
  const pre2 = usePrevious(num0)
  useLayoutEffect(() => {
    console.log(`useLayoutEffect`)
    return () => {
      console.log(`useLayoutEffect return`)
    }
  }, [num0])
  useEffect(() => {
    console.log(`num0 ${num0}, pre ${pre.current}`)
    pre1.current = num0
    return () => {
      console.log(`return`)
      pre.current = num0
    }
  }, [num0])

  console.log(`render num0, ${num0} ${pre.current} ${pre1.current}`)
  const onClick = useCallback((a, e) => {
    console.log(a, e)
    handleInputValue(a)
    import('../Utils/importJs').then((res) => {
      res.default()
    })
  }, [])
  const handleChange = (e) => {
    handleInputValue(e.target.value)
  }
  return (
    <div>
      <input
        type="button"
        value="click num"
        onClick={() => changeNum0(num0 + 1)}
      />

      <div>num0: {num0}</div>
      <div>pre: {pre.current} </div>
      <div>pre1: {pre1.current}</div>
      <div>pre2: {pre2}</div>
      <div>{false && 1}</div>
      <div>{0 && 1}</div>
      <label htmlFor="inputValue">无障碍</label>
      <input
        id="inputValue"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <input
        type="button"
        value="onClick 111"
        onClick={onClick.bind(this, 111)}
      />
    </div>
  )
}
export default memo(UesEffectPage)
