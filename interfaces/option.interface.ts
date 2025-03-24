interface Option {
  name: string
  action?: (() => void) | null
}

export default Option
