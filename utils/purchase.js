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
  const options = { style: 'currency', currency: 'CLP' }
  return Number(value).toLocaleString('es-CL', options)
}

const getTotal = (items) => {
  return items.reduce((acc, { total }) => acc + Number(total), 0)
}

export { convertItem, formatToCLP, getTotal }
