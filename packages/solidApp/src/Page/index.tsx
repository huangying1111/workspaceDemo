import { Accessor, Component, createSignal, For, Index, Setter } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

interface IProps {
  name: string
  sex: string
  children: any
  color: string
}
interface IList {
  text: string
  id: string
  checked: Accessor<boolean>
  setChecked: Setter<boolean>
}
const Child: Component<IProps> = (props: IProps) => {
  const { name } = props
  console.log(1)
  return (
    <div style={{ color: props.color }}>
      {name}({props.name}): {props.sex}
      <div>{props.children}</div>
    </div>
  )
}
interface IStore {
  todo: {
    text: string
    id: string
    checked: boolean
  }[]
}
const Todo: Component = () => {
  const [name, setName] = createSignal('hyyy')
  const [color, setColor] = createSignal('purple')
  const [list, setList] = createSignal<IList[]>([])
  const [store, setStore] = createStore<IStore>({ todo: [] })
  let input: HTMLInputElement | undefined
  let input2: HTMLInputElement | undefined

  const addTodo = () => {
    if (!input?.value?.trim()) return
    const [checked, setChecked] = createSignal<boolean>(false)
    setList([
      ...list(),
      {
        id: Math.random().toString(),
        text: input.value,
        checked: checked,
        setChecked: setChecked,
      },
    ])
    input.value = ''
  }

  const addTodo2 = () => {
    if (!input2?.value?.trim()) return
    // setStore('todo', (todo) => [
    //   ...todo,
    //   {
    //     id: Math.random().toString(),
    //     text: input2!.value,
    //     checked: false,
    //   },
    // ])
    setStore(
      'todo',
      produce((todo) =>
        todo.push({
          id: Math.random().toString(),
          text: input2!.value,
          checked: false,
        })
      )
    )
    input2.value = ''
  }
  const setChecked = (id: string) => {
    // setStore(
    //   'todo',
    //   (todo) => todo.id == id,
    //   'checked',
    //   (checked) => !checked
    // )
    setStore(
      'todo',
      (todo) => todo.id == id,
      produce((todo) => ((todo.checked = !todo.checked), (todo.text = '1111')))
    )
  }
  return (
    <>
      <Child color={color()} name={name()} sex={'女'}>
        lalalal
      </Child>
      <button onClick={[setName, 'hyyyyyyy']}>setName</button>
      <button onClick={[setColor, 'red']}>setColor</button>
      <p></p>
      <div>
        <input ref={input} />
        <button onClick={addTodo}>Add Todo1</button>
      </div>

      <For each={list()}>
        {(item) => (
          <li>
            <input
              type="checkbox"
              checked={item.checked()}
              onChange={[item.setChecked, !item.checked()]}
            ></input>
            {item.text}
          </li>
        )}
      </For>
      <div>
        <input ref={input2} />
        <button onClick={addTodo2}>Add Todo2</button>
      </div>
      <Index each={store.todo}>
        {(item) => (
          <li>
            <input
              type="checkbox"
              checked={item().checked}
              onChange={[setChecked, item().id]}
            ></input>
            {item().text}
          </li>
        )}
      </Index>
    </>
  )
}

export default Todo
