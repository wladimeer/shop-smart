import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const CustomText = ({ text = '', size = 20, align = 'center', color = '#FFFFFF' }) => {
  const { colors } = useTheme()
  const styles = allStyles({ colors })

  return <Text style={{ ...styles.text, fontSize: size, textAlign: align, color }}>{text}</Text>
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    text: {
      color: colors.secondary,
      fontFamily: 'RSC-Regular'
    }
  })

  return styles
}

export default CustomText
