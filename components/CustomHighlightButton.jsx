import { TouchableHighlight, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const CustomHighlightButton = ({
  children,
  text,
  handlePress,
  backgroundColor = '#2874A6',
  hoverBackgroundColor = '#2F80B5',
  radius = 3,
  customStyle = {}
}) => {
  const values = { backgroundColor, radius }
  const styles = allStyles({ values })

  return (
    <TouchableHighlight
      style={{ ...styles.container, ...customStyle }}
      underlayColor={hoverBackgroundColor}
      onPress={handlePress}
    >
      {children ? children : <Text style={styles.label}>{text}</Text>}
    </TouchableHighlight>
  )
}

const allStyles = ({ values }) => {
  const styles = StyleSheet.create({
    container: {
      width: 72,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: values.backgroundColor,
      borderRadius: values.radius,
      alignItems: 'center',
      height: 35
    },
    label: {
      color: '#FFFFFF',
      fontFamily: 'RSC-Regular',
      textAlign: 'center',
      fontSize: 20
    }
  })

  return styles
}

export default CustomHighlightButton
