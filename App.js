import 'react-native-gesture-handler'
import principalES from './locales/es/principal.json'
import statisticsES from './locales/es/statistics.json'
import { SCREENS_HEADER_KEY } from './constants/headers'
import appSettingsES from './locales/es/appSettings.json'
import appSettingsEN from './locales/en/appSettings.json'
import viewPurchasesES from './locales/es/viewPurchases.json'
import screensHeaderES from './locales/es/screensHeader.json'
import { VARIANT_FEATURES_MODAL_KEY } from './constants/modals'
import variantFeaturesEN from './locales/en/variantFeatures.json'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { SPANISH_LANGUAGE_CODE, ENGLISH_LANGUAGE_CODE } from './constants/locales'
import { VIEW_PURCHASES_SCREEN_KEY, PRINCIPAL_SCREEN_KEY } from './constants/screens'
import { NEW_PURCHASE_SCREEN_KEY, APP_SETTINGS_SCREEN_KEY } from './constants/screens'
import { STATISTICS_SCREEN_KEY, NEW_REGISTER_SCREEN_KEY } from './constants/screens'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from './constants/locales'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import variantFeaturesES from './locales/es/variantFeatures.json'
import viewPurchasesEN from './locales/en/viewPurchases.json'
import screensHeaderEN from './locales/en/screensHeader.json'
import { NEW_BILL_SCREEN_KEY } from './constants/screens'
import newRegisterES from './locales/es/newRegister.json'
import newRegisterEN from './locales/en/newRegister.json'
import newPurchaseES from './locales/es/newPurchase.json'
import newPurchaseEN from './locales/en/newPurchase.json'
import statisticsEN from './locales/en/statistics.json'
import { LanguageProvider } from './contexts/Language'
import principalEN from './locales/en/principal.json'
import * as SplashScreen from 'expo-splash-screen'
import newBillES from './locales/es/newBill.json'
import newBillEN from './locales/en/newBill.json'
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
      [NEW_REGISTER_SCREEN_KEY]: newRegisterES,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseES,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesES,
      [NEW_BILL_SCREEN_KEY]: newBillES,
      [VARIANT_FEATURES_MODAL_KEY]: variantFeaturesES,
      [APP_SETTINGS_SCREEN_KEY]: appSettingsES,
      [STATISTICS_SCREEN_KEY]: statisticsES,
      [SCREENS_HEADER_KEY]: screensHeaderES
    },
    [ENGLISH_LANGUAGE_CODE]: {
      [PRINCIPAL_SCREEN_KEY]: principalEN,
      [NEW_REGISTER_SCREEN_KEY]: newRegisterEN,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseEN,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesEN,
      [NEW_BILL_SCREEN_KEY]: newBillEN,
      [VARIANT_FEATURES_MODAL_KEY]: variantFeaturesEN,
      [APP_SETTINGS_SCREEN_KEY]: appSettingsEN,
      [STATISTICS_SCREEN_KEY]: statisticsEN,
      [SCREENS_HEADER_KEY]: screensHeaderEN
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
