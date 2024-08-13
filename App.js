import 'react-native-gesture-handler'
import headerES from './locales/es/header.json'
import principalES from './locales/es/principal.json'
import { SCREENS_HEADER_KEY } from './constants/headers'
import { VALID_LANGUAGE_CODES } from './constants/locales'
import { SPANISH_LANGUAGE_CODE } from './constants/locales'
import viewPurchasesES from './locales/es/viewPurchases.json'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { VIEW_PURCHASES_SCREEN_KEY } from './constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { DEFAULT_LANGUAGE_CODE } from './constants/locales'
import { PRINCIPAL_SCREEN_KEY } from './constants/screens'
import newPurchaseES from './locales/es/newPurchase.json'
import { LanguageProvider } from './contexts/Language'
import * as SplashScreen from 'expo-splash-screen'
import { I18nextProvider } from 'react-i18next'
import { useFonts } from 'expo-font'
import AppRouter from './AppRouter'
import { useEffect } from 'react'
import i18n from 'i18next'

SplashScreen.preventAutoHideAsync()

i18n.init({
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
  resources: {
    [SPANISH_LANGUAGE_CODE]: {
      [PRINCIPAL_SCREEN_KEY]: principalES,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseES,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesES,
      [SCREENS_HEADER_KEY]: headerES
    }
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  lng: VALID_LANGUAGE_CODES
})

const App = () => {
  const opacity = useSharedValue(0.2)

  const [fontsLoaded, fontError] = useFonts({
    'SSC-Regular': require('./fonts/SedanSC-Regular.ttf'),
    'RSC-Regular': require('./fonts/RedditSansCondensed-Regular.ttf')
  })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

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
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <AppRouter />
          </Animated.View>
        </GestureHandlerRootView>
      </LanguageProvider>
    </I18nextProvider>
  )
}

export default App
