import { useEffect } from 'react'
import { forwardRef, createRef } from 'React'
const Child = forwardRef((props, ref) => {
  return <input ref={ref} type="button" value="-" />
})
const ref = createRef()
const Parent = () => {
  useEffect(() => {
    ref.current.value = '255'
  }, [])
  return <Child ref={ref} />
}

export default Parent
