import { createSignal, For, Match, onMount, Switch } from 'solid-js'
import { Portal, Show } from 'solid-js/web'
interface IOpion {
  title: string
  value: string
  children?: IOpion[]
}
const TreeSelect = () => {
  const [show, setShow] = createSignal(true)
  const [value, setValue] = createSignal('')
  const [list, setList] = createSignal<IOpion[]>([])
  onMount(() => {
    setList([
      {
        title: 'Node1',
        value: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
          },
          {
            title: 'Child Node2',
            value: '0-0-2',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
      },
    ])
  })
  const itemRender = (item: IOpion) => {
    return (
      <div>
        <div>
          <Show when={(item.children ?? []).length != 0}>
            <button style={{ 'margin-right': '10px' }}>+</button>
          </Show>
          {item.title}
        </div>
        <Show when={(item.children ?? []).length != 0}>
          <div style={{ 'margin-left': '10px', 'padding-top': '5px' }}>
            <For each={item.children ?? []}>
              {(childrenItem) => itemRender(childrenItem)}
            </For>
          </div>
        </Show>
      </div>
    )
  }
  return (
    <div>
      <div id="modal">
        <input
          onblur={() => setShow(false)}
          onclick={() => setShow(true)}
          value={value()}
        ></input>
      </div>
      <Portal mount={document.getElementById('modal')!}>
        <Show when={show()}>
          <div
            style={{
              width: 200,
              top: '0',
              border: '1px solid',
              padding: '10px',
            }}
          >
            <For each={list()} fallback={<div>Loading...</div>}>
              {(item) => itemRender(item)}
            </For>
          </div>
        </Show>
      </Portal>
      <div>111</div>
      <div>111</div>
      <div>111</div>
    </div>
  )
}

export default TreeSelect
