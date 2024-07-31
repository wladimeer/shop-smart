import { lightenColor } from '../utils/color'
import { StyleSheet, TouchableHighlight } from 'react-native'
import CustomText from './CustomText'

const CustomHighlightButton = ({
  children,
  text,
  handlePress,
  backgroundColor = '#2874A6',
  radius = 3,
  variant = 'solid',
  disabled = false,
  customStyle = {}
}) => {
  const values = { backgroundColor, radius }
  const styles = allStyles({ variant, values })

  const underlayColor = lightenColor(backgroundColor, 0.1)

  return (
    <TouchableHighlight
      onPress={handlePress}
      style={[styles.container, customStyle, disabled && { backgroundColor: underlayColor }]}
      underlayColor={variant === 'solid' ? underlayColor : backgroundColor}
      disabled={disabled}
    >
      {children ? children : <CustomText text={text} />}
    </TouchableHighlight>
  )
}

const allStyles = ({ variant, values }) => {
  const styles = StyleSheet.create({
    container: {
      width: 72,
      display: 'flex',
      justifyContent: 'center',
      borderColor: variant === 'bordered' ? values.backgroundColor : null,
      backgroundColor: variant === 'solid' ? values.backgroundColor : null,
      borderWidth: variant === 'bordered' ? 2 : 0,
      borderRadius: values.radius,
      alignItems: 'center',
      height: 38
    }
  })

  return styles
}

export default CustomHighlightButton
