import type { Purchase } from 'interfaces/purchase.interfaces'
import type FormatCurrency from 'interfaces/format-currency.interface'
import { COUNTRIES } from '../constants/locales'

const convertItem = (item: Record<keyof Purchase, string | number>) => {
  Object.entries(item).forEach(([key, value]) => {
    const newKey = key as keyof Purchase

    if (value === 0 && key !== 'total') {
      item[newKey] = ''
    } else {
      item[newKey] = String(value)
    }
  })

  return item
}

const formatCurrency = ({ value, country }: FormatCurrency): string => {
  const countrySelected = COUNTRIES[country]

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: countrySelected.currency
  }

  return value.toLocaleString(countrySelected.locale, options)
}

const getTotal = (purchases: Purchase[]): number => {
  return purchases.reduce((acc, { total }) => acc + Number(total), 0)
}

const removeDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export { convertItem, formatCurrency, getTotal, removeDiacritics }
