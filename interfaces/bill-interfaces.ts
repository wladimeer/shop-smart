import type BillStatus from 'types/bill-status-type'
import type BaseRecord from './base-record.interface'

interface Bill {
  name: string
  amount: number
  status: BillStatus
}

interface Bills extends BaseRecord {
  elements: Bill[]
}

interface BillStatusInfo {
  id: number
  name: string
}

export { Bill, Bills, BillStatusInfo }
