import principalES from './locales/es/principal.json'
import NewPurchase from './screens/private/NewPurchase'
import { SPANISH_LANGUAGE_CODE } from './constants/locales'
import viewPurchasesES from './locales/es/viewPurchases.json'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from './constants/locales'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import ViewPurchases from './screens/private/ViewPurchases'
import { PRINCIPAL_SCREEN_KEY } from './constants/screens'
import newPurchaseES from './locales/es/newPurchase.json'
import Principal from './screens/public/Principal'
import { I18nextProvider } from 'react-i18next'
import { useFonts } from 'expo-font'
import i18n from 'i18next'

i18n.init({
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
  resources: {
    [SPANISH_LANGUAGE_CODE]: {
      [PRINCIPAL_SCREEN_KEY]: principalES,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseES,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesES
    }
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  lng: VALID_LANGUAGE_CODES
})

const Stack = createNativeStackNavigator()

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'SSC-Regular': require('./fonts/SedanSC-Regular.ttf'),
    'RSC-Regular': require('./fonts/RedditSansCondensed-Regular.ttf')
  })
  
  if (!fontsLoaded && !fontError) return null

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={PRINCIPAL_SCREEN_KEY} component={Principal} />
          <Stack.Screen name={NEW_PURCHASE_SCREEN_KEY} component={NewPurchase} />
          <Stack.Screen name={VIEW_PURCHASES_SCREEN_KEY} component={ViewPurchases} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  )
}

export default App