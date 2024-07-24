import moment from 'moment'

const getCurrentDatetime = () => {
  const currentDatetime = moment().format('DD-MM-YYYY hh:mm:ss')
  return currentDatetime.toString()
}

const isSameDatetime = (first, second) => {
  const firstDatetime = moment(first, 'DD-MM-YYYY hh:mm:ss')
  const secondDatetime = moment(second, 'DD-MM-YYYY hh:mm:ss')

  return firstDatetime.isSame(secondDatetime)
}

const isBeforeDatetime = (first, second) => {
  const firstDatetime = moment(first, 'DD-MM-YYYY hh:mm:ss')
  const secondDatetime = moment(second, 'DD-MM-YYYY hh:mm:ss')

  return firstDatetime.isBefore(secondDatetime)
}

const isAfterDatetime = (first, second) => {
  const firstDatetime = moment(first, 'DD-MM-YYYY hh:mm:ss')
  const secondDatetime = moment(second, 'DD-MM-YYYY hh:mm:ss')

  return firstDatetime.isAfter(secondDatetime)
}

export { getCurrentDatetime, isSameDatetime, isBeforeDatetime, isAfterDatetime }
