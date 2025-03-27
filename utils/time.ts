import { DATE_FORMATS } from '../constants/datas'
import type { DateTimeFormat } from 'types/date.types'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

const getCurrentDatetime = (): string => {
  return dayjs().format(DATE_FORMATS.DATETIME)
}

const getMonthNameFromDatetime = (datetime: DateTimeFormat): string => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.MONTH_NAME)
}

const getMonthNumberFromDatetime = (datetime: DateTimeFormat): string => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.MONTH_NUMBER)
}

const isSameDatetime = (first: DateTimeFormat, second: DateTimeFormat): boolean => {
  return dayjs(first, DATE_FORMATS.DATETIME).isSame(dayjs(second, DATE_FORMATS.DATETIME))
}

const isBeforeDatetime = (first: DateTimeFormat, second: DateTimeFormat): boolean => {
  return dayjs(first, DATE_FORMATS.DATETIME).isBefore(dayjs(second, DATE_FORMATS.DATETIME))
}

const isAfterDatetime = (first: DateTimeFormat, second: DateTimeFormat): boolean => {
  return dayjs(first, DATE_FORMATS.DATETIME).isAfter(dayjs(second, DATE_FORMATS.DATETIME))
}

const formatToDate = (datetime: DateTimeFormat): string => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.DATE)
}

const formatToText = (datetime: DateTimeFormat): string => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.DATE_TEXT)
}

const fromUntilNow = (datetime: DateTimeFormat): string => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).fromNow()
}

const isTodayDatetime = (datetime: DateTimeFormat): boolean => {
  return dayjs(datetime, DATE_FORMATS.DATETIME).isSame(dayjs(), 'day')
}

export {
  getCurrentDatetime,
  getMonthNameFromDatetime,
  getMonthNumberFromDatetime,
  isSameDatetime,
  isBeforeDatetime,
  isAfterDatetime,
  formatToDate,
  formatToText,
  fromUntilNow,
  isTodayDatetime
}
