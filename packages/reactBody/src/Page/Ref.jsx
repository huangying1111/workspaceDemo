import { useImperativeHandle } from 'react'
import { useEffect } from 'react'
import { forwardRef, createRef } from 'React'
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    onClick: onClick,
  }))
  const onClick = () => {
    console.log('onClick')
  }
  const onClick2 = () => {
    console.log('onClick2')
  }
  return <input ref={ref} type="button" value="-" />
})
const ref = createRef()
const Parent = () => {
  useEffect(() => {
    ref.current.value = '255'
    ref.current.onClick()
  }, [])
  return <Child ref={ref} />
}

export default Parent
