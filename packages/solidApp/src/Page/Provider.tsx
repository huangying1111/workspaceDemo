import {
  Accessor,
  Context,
  createContext,
  createSignal,
  useContext,
} from 'solid-js'

type EValue = [
  Accessor<number>,
  {
    increment(): void
    decrement(): void
  }
]
const CounterContext = createContext<EValue>()
export const CounterProvider = (props: { count: number; children: any }) => {
  const [count, setCount] = createSignal(props.count || 0)
  const value: EValue = [
    count,
    {
      increment: () => {
        setCount((c) => c + 1)
      },
      decrement() {
        setCount((c) => c - 1)
      },
    },
  ]
  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  )
}
export const useCounter: () => EValue = () => {
  return useContext<EValue>(CounterContext as Context<EValue>)
}
