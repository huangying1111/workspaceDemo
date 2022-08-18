import { CounterProvider } from './Provider'
import ProviderChild from './ProviderChild'

export default function ProviderApp() {
  return (
    <CounterProvider count={8}>
      <ProviderChild></ProviderChild>
    </CounterProvider>
  )
}
