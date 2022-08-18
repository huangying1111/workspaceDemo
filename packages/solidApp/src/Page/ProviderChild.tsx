import { createEffect, createSignal, on } from 'solid-js'
import { useCounter } from './Provider'

const ProviderChild = () => {
  const [count, { increment, decrement }] = useCounter()
  const [a, setA] = createSignal(0)
  createEffect(
    on(a, (a) => {
      console.log(count(), a)
    })
  )
  return (
    <div>
      <div>ProviderChild</div>
      <div>count: {count()}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <div>a: {a()}</div>
      <button onClick={() => setA((c) => c + 1)}>increment a</button>
      <button onClick={() => setA((c) => c - 1)}>decrement a</button>
    </div>
  )
}

export default ProviderChild
