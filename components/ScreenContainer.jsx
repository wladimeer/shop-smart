import { StyleSheet, View, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({ children, background = null, withSafeArea = true }) => {
  const fadeAnimation = new Animated.Value(0)

  const handleLoadImage = () => {
    const config = {
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }

    Animated.timing(fadeAnimation, config).start()
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.background} />

      <Animated.Image
        source={background && background}
        style={{ ...styles.background, opacity: fadeAnimation }}
        onLoad={handleLoadImage}
        resizeMode="cover"
        blurRadius={3}
      />

      {withSafeArea ? <SafeAreaView style={styles.content}>{children}</SafeAreaView> : children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    width: '100%',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    height: '100%'
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default ScreenContainer
