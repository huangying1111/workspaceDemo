/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import Todo from './Page'
import InputPage from './Page/LInput'
import ProviderApp from './Page/ProviderApp'

const App = () => (
  <>
    <Todo></Todo>
    <ProviderApp></ProviderApp>
    <InputPage />
  </>
)
render(App, document.getElementById('root') as HTMLElement)
