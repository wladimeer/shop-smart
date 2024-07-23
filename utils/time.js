import moment from 'moment'

const getCurrentDatetime = () => {
  const currentDatetime = moment().format('DD-MM-YYYY hh:mm:ss')
  return currentDatetime.toString()
}

export { getCurrentDatetime }
