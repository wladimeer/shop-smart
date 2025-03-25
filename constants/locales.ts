import type { LanguageKey, Language } from 'types/language.types'
import type CountryInfo from 'interfaces/country-info.interface'
import type Country from 'types/country.type'

const LANGUAGE_CODES: Record<LanguageKey, Language> = {
  SPANISH: 'es',
  ENGLISH: 'en',
  DEFAULT: 'es'
}

const COUNTRIES: Record<Country, CountryInfo> = {
  CL: { code: 'CL', currency: 'CLP', locale: 'es-CL' }
}

export { LANGUAGE_CODES, COUNTRIES }
