import React from 'react'
import Footer from './Footer'
import Header from 'header'
import UesEffectPage from './Page/UesEffectPage'
import ReducerPage from './Page/ReducerPage'
import Context from './Page/Context'
import Ref from './Page/Ref'
import Hoc from './Page/Hoc'

function App() {
  return (
    <div className="App">
      <Header />
      <div>body</div>
      <UesEffectPage />
      <ReducerPage />
      <Context />
      <Ref />
      <Hoc />
      <Footer />
    </div>
  )
}

export default App
