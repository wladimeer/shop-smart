import moment from 'moment'
import { DATE_FORMATS } from '../constants/datas'
import 'moment/min/locales'

const getCurrentDatetime = () => {
  return moment().format(DATE_FORMATS.DATETIME)
}

const getMonthNameFromDatetime = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.MONTH_NAME)
}

const getMonthNumberFromDatetime = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.MONTH_NUMBER)
}

const isSameDatetime = (first, second) => {
  const firstDatetime = moment(first, DATE_FORMATS.DATETIME)
  const secondDatetime = moment(second, DATE_FORMATS.DATETIME)

  return firstDatetime.isSame(secondDatetime)
}

const isBeforeDatetime = (first, second) => {
  const firstDatetime = moment(first, DATE_FORMATS.DATETIME)
  const secondDatetime = moment(second, DATE_FORMATS.DATETIME)

  return firstDatetime.isBefore(secondDatetime)
}

const isAfterDatetime = (first, second) => {
  const firstDatetime = moment(first, DATE_FORMATS.DATETIME)
  const secondDatetime = moment(second, DATE_FORMATS.DATETIME)

  return firstDatetime.isAfter(secondDatetime)
}

const formatToDate = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.DATE)
}

const formatToText = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).format(DATE_FORMATS.DATE_TEXT)
}

const fromUntilNow = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).fromNow()
}

const isTodayDatetime = (datetime) => {
  return moment(datetime, DATE_FORMATS.DATETIME).isSame(moment(), 'day')
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
