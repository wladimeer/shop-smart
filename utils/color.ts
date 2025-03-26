import { BASE_COLORS } from '../constants/config'

const lightenColor = (hexadecimal: string, factor: number): string => {
  hexadecimal = hexadecimal.replace(/^#/, '')

  let r: number = parseInt(hexadecimal.substring(0, 2), 16)
  let g: number = parseInt(hexadecimal.substring(2, 4), 16)
  let b: number = parseInt(hexadecimal.substring(4, 6), 16)

  r = Math.min(255, Math.floor(r + (255 - r) * factor))
  g = Math.min(255, Math.floor(g + (255 - g) * factor))
  b = Math.min(255, Math.floor(b + (255 - b) * factor))

  const newHexadecimal: number = (r << 16) + (g << 8) + b

  return `#${newHexadecimal.toString(16).padStart(6, '0').toUpperCase()}`
}

const uniqueColorGenerator = (): (() => string) => {
  let availableColors: string[] = [...BASE_COLORS]

  const generateColor = (): string => {
    const { length } = availableColors

    if (length === 0) availableColors = [...BASE_COLORS]

    const randomIndex: number = Math.floor(Math.random() * length)
    return availableColors.splice(randomIndex, 1)[0]
  }

  return generateColor
}

export { lightenColor, uniqueColorGenerator }
