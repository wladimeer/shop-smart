const lightenColor = (hexadecimal, factor) => {
  hexadecimal = hexadecimal.replace(/^#/, '')

  let r = parseInt(hexadecimal.substring(0, 2), 16)
  let g = parseInt(hexadecimal.substring(2, 4), 16)
  let b = parseInt(hexadecimal.substring(4, 6), 16)

  r = Math.min(255, Math.floor(r + (255 - r) * factor))
  g = Math.min(255, Math.floor(g + (255 - g) * factor))
  b = Math.min(255, Math.floor(b + (255 - b) * factor))

  const newHexadecimal = (r << 16) + (g << 8) + b

  return `#${newHexadecimal.toString(16).padStart(6, '0').toUpperCase()}`
}

const uniqueColorGenerator = () => {
  const baseColors = [
    '#4F2E5F',
    '#60346F',
    '#724080',
    '#844C91',
    '#9556A1',
    '#A562B1',
    '#B06EC1',
    '#C17AD1'
  ]

  let availableColors = [...baseColors]

  const generateColor = () => {
    const { length } = availableColors

    if (length === 0) availableColors = [...baseColors]

    const randomIndex = Math.floor(Math.random() * length)
    return availableColors.splice(randomIndex, 1)[0]
  }

  return generateColor
}

export { lightenColor, uniqueColorGenerator }
