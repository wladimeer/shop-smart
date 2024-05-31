import { View } from 'react-native'
import { StyleSheet } from 'react-native'

const Spacer = () => {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    backgroundColor: '#ECECEC',
    height: 2
  }
})

export default Spacer
