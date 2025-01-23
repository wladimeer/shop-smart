const getTotal = (items) => {
  return items.reduce((acc, { amount }) => acc + Number(amount), 0)
}

const getStatus = (id, states) => {
  const indexedStates = {}

  states.forEach(({ id, name }) => {
    indexedStates[id] = name
  })

  return indexedStates[id]
}

export { getTotal, getStatus }
