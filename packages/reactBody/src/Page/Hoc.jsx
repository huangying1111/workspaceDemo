import React from 'react'

function hocComponent(Component) {
  return Component
}
const Hoc = (props) => {
  return <div>test {props.a}</div>
}

// React 组件也能够返回存储在数组中的一组元素：
const List = () => {
  return [
    // 不要忘记设置 key :)
    <div key="A">First item</div>,
    <div key="B">Second item</div>,
    <div key="C">Third item</div>,
  ]
}
export default hocComponent(() => <List />)
