import type { DateKey, Date, DateTime, Month } from 'types/date.types'
import type { LimitKey } from 'types/limit.types'

const LIMIT_VALUES: Record<LimitKey, number> = {
  UNIT: 10000000000,
  QUANTITY: 1000
}

const DATE_FORMATS: Record<DateKey, Date | DateTime | Month> = {
  DATETIME: 'DD-MM-YYYY HH:mm:ss',
  DATE: 'DD-MM-YYYY',
  DATE_TEXT: 'LL',
  MONTH_NAME: 'MMMM',
  MONTH_NUMBER: 'MM'
}

export { LIMIT_VALUES, DATE_FORMATS }
