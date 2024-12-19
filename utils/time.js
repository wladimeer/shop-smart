import moment from 'moment'
import { DATE_FORMAT, DATE_TEXT_FORMAT } from '../constants/datas'
import { DATETIME_FORMAT, MONTH_NAME_FORMAT } from '../constants/datas'
import { MONTH_NUMBER_FORMAT } from '../constants/datas'
import 'moment/min/locales'

const getCurrentDatetime = () => {
  return moment().format(DATETIME_FORMAT)
}

const getMonthNameFromDatetime = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).format(MONTH_NAME_FORMAT)
}

const getMonthNumberFromDatetime = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).format(MONTH_NUMBER_FORMAT)
}

const isSameDatetime = (first, second) => {
  const firstDatetime = moment(first, DATETIME_FORMAT)
  const secondDatetime = moment(second, DATETIME_FORMAT)

  return firstDatetime.isSame(secondDatetime)
}

const isBeforeDatetime = (first, second) => {
  const firstDatetime = moment(first, DATETIME_FORMAT)
  const secondDatetime = moment(second, DATETIME_FORMAT)

  return firstDatetime.isBefore(secondDatetime)
}

const isAfterDatetime = (first, second) => {
  const firstDatetime = moment(first, DATETIME_FORMAT)
  const secondDatetime = moment(second, DATETIME_FORMAT)

  return firstDatetime.isAfter(secondDatetime)
}

const formatToDate = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).format(DATE_FORMAT)
}

const formatToText = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).format(DATE_TEXT_FORMAT)
}

const fromUntilNow = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).fromNow()
}

const isTodayDatetime = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).isSame(moment(), 'day')
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
