import { ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import background from '../assets/principal-background.png'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const ScreenContainer = ({ children, includeBackground = false }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={includeBackground ? background : null}
      >
        <SafeAreaView style={styles.content}>{children}</SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1
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
