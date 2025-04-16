import 'react-native-gesture-handler'
import { I18nextProvider } from 'react-i18next'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import { useLanguageStore } from 'store/language'
import * as Updates from 'expo-updates'
import { useFonts } from 'expo-font'
import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { locale } from 'dayjs'
import i18n from 'i18next'
import 'dayjs/locale/es'
import 'dayjs/locale/en'
import './i18n/config'

SplashScreen.preventAutoHideAsync()

const App = () => {
  const { language } = useLanguageStore()
  const fadeOpacity = useSharedValue<number>(0.2)

  const [fontsLoaded, fontError] = useFonts({
    'SSC-Regular': require('./fonts/SedanSC-Regular.ttf'),
    'RSC-Regular': require('./fonts/RedditSansCondensed-Regular.ttf')
  })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value
  }))

  const style = [{ flex: 1 }, animatedStyle]

  useEffect(() => {
    i18n.changeLanguage(language)
    locale(language)
  }, [language])

  useEffect(() => {
    const prepare = async () => {
      const config = { duration: 800 }
      await SplashScreen.hideAsync()
      fadeOpacity.value = withTiming(1, config)
    }

    setTimeout(prepare, 1500)
  }, [])

  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync()

        if (update.isAvailable) {
          console.log('✅ Update found! Downloading...')
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync()
        } else {
          console.log('🆗 App is up to date.')
        }
      } catch (e) {
        console.log('❌ Error checking for updates:', e)
      }
    }

    checkUpdates()
  }, [])

  if (!fontsLoaded && !fontError) return null

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView>
        <Reanimated.View style={style}>
          <AppRouter />
        </Reanimated.View>
      </GestureHandlerRootView>
    </I18nextProvider>
  )
}

export default App
