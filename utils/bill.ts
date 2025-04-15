import type { Bill, BillStatusInfo } from 'interfaces/bill-interfaces'
import type FormatCurrency from 'interfaces/format-currency.interface'
import { COUNTRIES } from '../constants/locales'

const formatCurrency = ({ value, country }: FormatCurrency): string => {
  const countrySelected = COUNTRIES[country]

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: countrySelected.currency
  }

  return value.toLocaleString(countrySelected.locale, options)
}

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

export { formatCurrency, getTotal, getStatus }
