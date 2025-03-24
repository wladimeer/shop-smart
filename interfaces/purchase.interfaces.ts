import type BaseRecord from './base-record.interface'

interface Purchase {
  name: string
  unit: number
  quantity: number
  total: number
}

interface Purchases extends BaseRecord {
  elements: Purchase[]
}

export { Purchase, Purchases }
