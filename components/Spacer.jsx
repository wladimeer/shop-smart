import { View } from 'react-native'
import { StyleSheet } from 'react-native'

const Spacer = ({ size = 2, color = '#ECECEC' }) => {
  const styles = allStyles()

  return <View style={[styles.container, { height: size, backgroundColor: color }]} />
}

const allStyles = () => {
  const styles = StyleSheet.create({
    container: {
      width: 'auto'
    }
  })

  return styles
}

export default Spacer
