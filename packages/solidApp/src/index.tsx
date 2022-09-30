/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import Todo from './Page'
import InputPage from './Page/LInput'
import ProviderApp from './Page/ProviderApp'
import TreeSelect from './Page/TreeSelect'

const App = () => (
  <>
    <Todo></Todo>
    <ProviderApp></ProviderApp>
    <InputPage />
    <TreeSelect />
  </>
)
render(App, document.getElementById('root') as HTMLElement)
