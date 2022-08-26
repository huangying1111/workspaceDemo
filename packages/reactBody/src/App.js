import React, { createRef, useRef } from 'react'
import Model from './Page/Model'
import Header from 'header'
import UesEffectPage from './Page/UesEffectPage'
import ReducerPage from './Page/ReducerPage'
import Context from './Page/Context'
import Ref from './Page/Ref'
import Hoc from './Page/Hoc'

function App() {
  return (
    <div className="App" id="app">
      <Header />
      <div>body</div>
      <UesEffectPage />
      <ReducerPage />
      <Context />
      <Ref />
      <Hoc />
      {
        // Portals
      }
      <Model />
      <div>footer</div>
    </div>
  )
}

export default App
