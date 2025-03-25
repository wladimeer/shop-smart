import type Currency from 'types/currency.type'
import type Country from 'types/country.type'

export interface CountryInfo {
  code: Country
  currency: Currency
  locale: Intl.LocalesArgument
}

export default CountryInfo
