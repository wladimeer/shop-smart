const convertItem = (item) => {
  const keys = Object.keys(item)

  keys.forEach((key) => {
    const value = item[key]

    if (value === 0 && key !== 'total') {
      item[key] = ''
    } else {
      item[key] = String(value)
    }
  })

  return item
}

const formatToCLP = (value) => {
  value = String(value)

  if (value.length > 3) {
    const splitedValue = value.split('').reverse()
    let assistant = ''

    splitedValue.forEach((character) => {
      assistant += character

      if (assistant.length % 3 === 0) {
        if (assistant.length < value.length) {
          assistant += '.'
        }
      }
    })

    value = assistant.split('').reverse()
  }

  return value
}

const getTotal = (items) => {
  return items.reduce((acc, { total }) => acc + Number(total), 0)
}

export { convertItem, formatToCLP, getTotal }
