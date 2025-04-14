import { StyleSheet, View } from 'react-native'
import { DEFAULT_INSETS } from '../constants/config'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BackgroundImage from './BackgroundImage'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({ children, colorSafeArea = null, noSafeArea = false }) => {
  const insets = useSafeAreaInsets()

  const styles = allStyles({ insets, colorSafeArea })

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundImage />

      <View style={styles.content}>{children}</View>

      {!noSafeArea && <View style={styles.safeAreaBottom} />}
    </View>
  )
}

const allStyles = ({ insets, colorSafeArea }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1
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
