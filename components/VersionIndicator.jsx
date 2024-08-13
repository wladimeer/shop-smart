import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const VersionIndicator = () => {
  const styles = allStyles()

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#154360', '#633974']}
        style={styles.content}
        start={[0, 0]}
        end={[1, 1]}
      >
        <Text style={styles.indicator}>Plus+</Text>
      </LinearGradient>
    </View>
  )
}

const allStyles = () => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 25,
      right: 25
    },
    content: {
      borderRadius: '100%',
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    indicator: {
      color: '#FFFFFF',
      fontSize: 18
    }
  })

  return styles
}

export default VersionIndicator
