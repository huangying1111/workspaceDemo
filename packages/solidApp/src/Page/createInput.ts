import { batch, createSignal } from 'solid-js'

const createInput = (title: string) => {
  let instanceRef: HTMLInputElement | undefined
  const [v, setValue] = createSignal('')
  const [errorMsg, setErrorMsg] = createSignal('')

  const onChange = (value: string) => {
    batch(() => {
      setErrorMsg('')
      setValue(value)
    })
  }
  const valid = () => {
    return new Promise<boolean>((resolve, reject) => {
      const value = v()
      if (!value) {
        setErrorMsg(`请输入${title}`)
        return reject(false)
      }
      if (value.length < 2) {
        setErrorMsg('你输入的信息长度不够')
        return reject(false)
      }
      setErrorMsg('')
      return resolve(true)
    })
  }
  return {
    instanceRef,
    errorMsg,
    setErrorMsg,
    value: v,
    onChange,
    valid,
    placeholder: title,
  }
}
export default createInput
