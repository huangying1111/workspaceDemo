import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const AppContext = React.createContext('default')
const App1 = () => {
  return (
    <AppContext.Provider value="App3">
      <div>App1</div>
      <App2 />
    </AppContext.Provider>
  )
}
// children 参数
const Repeat = (props) => {
  const items = []
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props?.children(i))
  }
  return <ul>{items}</ul>
}
const ListOfTenThings = () => {
  return <Repeat numTimes={10}>{(i) => <li>{i}</li>}</Repeat>
}
const App2 = () => {
  return (
    <div>
      <div>App2</div>
      <ListOfTenThings />
      <App3 />
    </div>
  )
}

const App3 = () => {
  return <AppContext.Consumer>{(value) => value ?? '-'}</AppContext.Consumer>
}

export default App1
