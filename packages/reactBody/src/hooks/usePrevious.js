import { useRef, useEffect } from 'react'
function usePrevious(state) {
  const ref = useRef()
  useEffect(() => {
    ref.current = state
  })
  return ref.current
}
export default usePrevious
