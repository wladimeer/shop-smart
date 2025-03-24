import type BaseModal from './base-modal-interface'
import type Option from './option.interface'

interface SelectionModal extends BaseModal {
  options: Option[]
}

export default SelectionModal
