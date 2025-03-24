interface BaseModal {
  visible: boolean
  title: string
  action?: () => void
  confirm?: string
  cancel?: string
}

export default BaseModal
