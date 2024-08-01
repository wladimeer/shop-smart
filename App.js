import 'react-native-gesture-handler'
import headerES from './locales/es/header.json'
import principalES from './locales/es/principal.json'
import { SCREENS_HEADER_KEY } from './constants/headers'
import { SPANISH_LANGUAGE_CODE } from './constants/locales'
import viewPurchasesES from './locales/es/viewPurchases.json'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from './constants/locales'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { PRINCIPAL_SCREEN_KEY } from './constants/screens'
import newPurchaseES from './locales/es/newPurchase.json'
import { LanguageProvider } from './contexts/Language'
import { I18nextProvider } from 'react-i18next'
import { useFonts } from 'expo-font'
import AppRouter from './AppRouter'
import i18n from 'i18next'

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
  const [fontsLoaded, fontError] = useFonts({
    'SSC-Regular': require('./fonts/SedanSC-Regular.ttf'),
    'RSC-Regular': require('./fonts/RedditSansCondensed-Regular.ttf')
  })

  if (!fontsLoaded && !fontError) return null

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </I18nextProvider>
  )
}

export default App
