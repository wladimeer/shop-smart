import { StyleSheet, View, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({ children, background = null, withSafeArea = true }) => {
  const fadeAnimation = new Animated.Value(0)
  const { colors } = useTheme()

  const styles = allStyles({ colors })

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

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    background: {
      width: '100%',
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.quaternary,
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

  return styles
}

export default ScreenContainer
