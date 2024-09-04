import { StyleSheet, View, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEFAULT_BOTTOM_INSET } from '../constants/config'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({
  children,
  background = null,
  colorSafeArea = null,
  noSafeArea = false
}) => {
  const insets = useSafeAreaInsets()
  const fadeAnimation = new Animated.Value(0)
  const { colors } = useTheme()

  const styles = allStyles({ colors, insets, colorSafeArea })

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

      {!noSafeArea && <View style={styles.safeAreaBottom} />}
    </View>
  )
}

const allStyles = ({ colors, insets, colorSafeArea }) => {
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
      paddingBottom: insets.bottom || DEFAULT_BOTTOM_INSET,
      backgroundColor: colorSafeArea ?? 'transparent'
    }
  })

  return styles
}

export default ScreenContainer
