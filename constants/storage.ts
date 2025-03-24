import type { StorageKey, Storage } from 'types/storage.types'

const STORAGE_KEYS: Record<StorageKey, Storage> = {
  CART_ELEMENTS: 'cartElements',
  ELEMENTS_LIST: 'elementsList',
  BILL_ELEMENTS: 'billElements',
  BILLS_LIST: 'billsList',
  LANGUAGE: 'language'
}

export { STORAGE_KEYS }
