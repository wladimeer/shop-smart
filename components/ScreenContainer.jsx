import { StyleSheet, View } from 'react-native'
import { DEFAULT_INSETS } from '../constants/config'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({
  children,
  background = null,
  colorSafeArea = null,
  noSafeArea = false
}) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const fadeOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value
  }))

  const styles = allStyles({ colors, insets, colorSafeArea })

  const handleLoadImage = () => {
    fadeOpacity.value = withTiming(1, { duration: 500 })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.background} />

      <Reanimated.Image
        source={background || undefined}
        style={[styles.background, animatedStyle]}
        onLoadEnd={handleLoadImage}
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
      paddingBottom: insets.bottom || DEFAULT_INSETS.BOTTOM,
      backgroundColor: colorSafeArea ?? 'transparent'
    }
  })

  return styles
}

export default ScreenContainer
