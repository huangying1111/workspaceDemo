import { Accessor, Setter, Show, splitProps } from 'solid-js'
import createInput from './createInput'
interface IProps {
  instanceRef: HTMLInputElement | undefined
  errorMsg: Accessor<string>
  setErrorMsg: Setter<string>
  value: Accessor<string>
  onChange: (value: string) => void
  onblur: () => void
  placeholder: string
}
const LInput = (props: IProps) => {
  const [local, inputProps] = splitProps(props, ['errorMsg'])
  return (
    <div>
      <p></p>
      <input
        style={{ 'border-color': local.errorMsg() ? 'red' : '' }}
        placeholder={inputProps.placeholder}
        ref={inputProps.instanceRef}
        value={inputProps.value()}
        // @ts-ignore
        onchange={(e) => inputProps.onChange(e.target?.value ?? '')}
        onblur={inputProps.onblur}
        type="text"
      />
      <Show when={!!local.errorMsg()}>
        <span style={{ color: 'red' }}>{local.errorMsg()}</span>
      </Show>
      <p></p>
    </div>
  )
}
const InputPage = () => {
  const [nameInputValid, nameInput] = splitProps(createInput('name'), ['valid'])
  const [passwordInputValid, passwordInput] = splitProps(
    createInput('password'),
    ['valid']
  )
  const onClick = async () => {
    const nameValid = await nameInputValid.valid()
    const passwordValid = await passwordInputValid.valid()
    if (nameValid && passwordValid) {
      alert(
        `成功 nameInput: ${nameInput.value()} passwordInput: ${passwordInput.value()}`
      )
    }
  }
  console.log('2345435')
  return (
    <div>
      <LInput {...nameInput} onblur={nameInputValid.valid} />
      <LInput {...passwordInput} onblur={passwordInputValid.valid} />
      <button onClick={onClick}>提交</button>
    </div>
  )
}
export default InputPage
