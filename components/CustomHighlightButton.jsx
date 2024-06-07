import { TouchableHighlight, Text } from 'react-native'
import { StyleSheet } from 'react-native'

const CustomHighlightButton = ({ children, text, handlePress, customStyle = {} }) => {
  return (
    <TouchableHighlight
      style={{ ...styles.container, ...customStyle }}
      underlayColor={'#2F80B5'}
      onPress={handlePress}
    >
      {children ? children : <Text style={styles.label}>{text}</Text>}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 72,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#2874A6',
    alignItems: 'center',
    borderRadius: 12,
    height: 35
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'RSC-Regular',
    textAlign: 'center',
    fontSize: 20
  }
})

export default CustomHighlightButton
