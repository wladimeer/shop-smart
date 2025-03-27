import type { DateKey, DateFormat, DateTextFormat, DateTimeFormat } from 'types/date.types'
import type { MonthNameFormat, MonthNumberFormat } from 'types/date.types'
import type { LimitKey } from 'types/limit.types'

const LIMIT_VALUES: Record<LimitKey, number> = {
  UNIT: 10000000000,
  QUANTITY: 1000
}

const DATE_FORMATS: Record<
  DateKey,
  DateFormat | DateTextFormat | DateTimeFormat | MonthNameFormat | MonthNumberFormat
> = {
  DATE: 'DD-MM-YYYY',
  DATE_TEXT: 'LL',
  DATETIME: 'DD-MM-YYYY HH:mm:ss',
  MONTH_NAME: 'MMMM',
  MONTH_NUMBER: 'MM'
}

export { LIMIT_VALUES, DATE_FORMATS }
