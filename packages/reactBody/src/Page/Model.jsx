import { useLayoutEffect } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'

const Model = () => {
  const [model, setModel] = useState()
  const [show, setShow] = useState(false)
  useLayoutEffect(() => {
    setModel(document.getElementById('root'))
  }, [])
  if (!model) return <></>
  return (
    <div>
      <button onClick={() => setShow(true)}>打开弹出</button>
      {show &&
        ReactDOM.createPortal(
          <div
            style={{
              background: 'red',
              top: '100px',
              left: '100px',
              right: '100px',
              bottom: '100px',
              position: 'absolute',
            }}
          >
            <button onClick={() => setShow(false)}>关闭</button>
          </div>,
          model
        )}
    </div>
  )
}
export default Model
