import moment from 'moment'
import { DATE_FORMAT, DATE_TEXT_FORMAT, DATETIME_FORMAT } from '../constants/datas'
import { DEFAULT_LANGUAGE_CODE } from '../constants/locales'
import 'moment/min/locales'
import i18n from 'i18next'

moment.locale(i18n.language ?? DEFAULT_LANGUAGE_CODE)

const getCurrentDatetime = () => {
  return moment().format(DATETIME_FORMAT)
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
  isSameDatetime,
  isBeforeDatetime,
  isAfterDatetime,
  formatToDate,
  formatToText,
  fromUntilNow,
  isTodayDatetime
}
