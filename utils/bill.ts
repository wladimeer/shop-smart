import type { Bill, BillStatusInfo } from 'interfaces/bill-interfaces'

const getTotal = (bills: Bill[]): number => {
  return bills.reduce((acc, { amount }) => acc + Number(amount), 0)
}

const getStatus = (id: number, states: BillStatusInfo[]): string => {
  const indexedStates: Record<number, string> = {}

  states.forEach(({ id, name }) => {
    indexedStates[id] = name
  })

  return indexedStates[id]
}

export { getTotal, getStatus }
