import { StyleSheet, View, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({ children, background = null, colorSafeArea = 'transparent' }) => {
  const insets = useSafeAreaInsets()
  const fadeAnimation = new Animated.Value(0)
  const { colors } = useTheme()

  const styles = allStyles({ colors, insets })

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

      <View style={styles.content}>{children}</View>

      <View style={{ ...styles.safeAreaBottom, backgroundColor: colorSafeArea }} />
    </View>
  )
}

const allStyles = ({ colors, insets }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    background: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.quaternary
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    safeAreaBottom: {
      paddingBottom: insets.bottom
    }
  })

  return styles
}

export default ScreenContainer
