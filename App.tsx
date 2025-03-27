import 'react-native-gesture-handler'
import { I18nextProvider } from 'react-i18next'
import { LanguageProvider } from './contexts/Language'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import AppRouter from './AppRouter'
import { useEffect } from 'react'
import i18n from 'i18next'
import 'dayjs/locale/es'
import 'dayjs/locale/en'
import './i18n/config'

SplashScreen.preventAutoHideAsync()

const App = () => {
  const opacity = useSharedValue<number>(0.2)

  const [fontsLoaded, fontError] = useFonts({
    'SSC-Regular': require('./fonts/SedanSC-Regular.ttf'),
    'RSC-Regular': require('./fonts/RedditSansCondensed-Regular.ttf')
  })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const style = [{ flex: 1 }, animatedStyle]

  useEffect(() => {
    const prepare = async () => {
      const config = { duration: 800 }
      await SplashScreen.hideAsync()
      opacity.value = withTiming(1, config)
    }

    setTimeout(prepare, 1500)
  }, [])

  if (!fontsLoaded && !fontError) return null

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <GestureHandlerRootView>
          <Reanimated.View style={style}>
            <AppRouter />
          </Reanimated.View>
        </GestureHandlerRootView>
      </LanguageProvider>
    </I18nextProvider>
  )
}

export default App
