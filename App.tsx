import 'react-native-gesture-handler'
import { I18nextProvider } from 'react-i18next'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SplashScreen from 'components/SplashScreen'
import { useLanguageStore } from 'store/language'
import { useEffect, useState } from 'react'
import * as Updates from 'expo-updates'
import { useFonts } from 'expo-font'
import AppRouter from './AppRouter'
import { locale } from 'dayjs'
import i18n from 'i18next'
import 'dayjs/locale/es'
import 'dayjs/locale/en'
import './i18n/config'

const App = () => {
  const { language } = useLanguageStore()
  const [isAppReady, setIsAppReady] = useState<boolean>(false)
  const fadeOpacity = useSharedValue<number>(0.1)

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
      setIsAppReady(true)
    }

    setTimeout(prepare, 1500)
  }, [])

  useEffect(() => {
    if (isAppReady) {
      const config = { duration: 500 }
      fadeOpacity.value = withTiming(1, config)
    }
  }, [isAppReady])

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

  if ((!fontsLoaded && !fontError) || !isAppReady) return <SplashScreen />

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
