import moment from 'moment'
import { DATE_FORMAT, DATE_TEXT_FORMAT, DATETIME_FORMAT } from '../constants/datas'

const getCurrentDatetime = () => {
  const currentDatetime = moment().format(DATETIME_FORMAT)
  return currentDatetime.toString()
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
  return moment(datetime).format(DATE_FORMAT)
}

const formatToText = (datetime) => {
  return moment(datetime, DATETIME_FORMAT).format(DATE_TEXT_FORMAT)
}

const fromUntilNow = (datetime) => {
  return moment(datetime).fromNow()
}

export {
  getCurrentDatetime,
  isSameDatetime,
  isBeforeDatetime,
  isAfterDatetime,
  formatToDate,
  formatToText,
  fromUntilNow
}
