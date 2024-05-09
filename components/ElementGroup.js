import { View, StyleSheet } from 'react-native'

const ElementGroup = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create(({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  }
}))

export default ElementGroup