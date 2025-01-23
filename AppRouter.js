import Statistics from './screens/private/Statistics'
import NewRegister from './screens/private/NewRegister'
import NewPurchase from './screens/private/NewPurchase'
import { SCREENS_HEADER_KEY } from './constants/headers'
import { NEW_BILL_SCREEN_KEY } from './constants/screens'
import ViewPurchases from './screens/private/ViewPurchases'
import { APP_SETTINGS_SCREEN_KEY, NEW_REGISTER_SCREEN_KEY } from './constants/screens'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { PRINCIPAL_SCREEN_KEY, STATISTICS_SCREEN_KEY } from './constants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AppSettings from './screens/private/AppSettings'
import Principal from './screens/public/Principal'
import NewBill from './screens/private/NewBill'
import { useTranslation } from 'react-i18next'
import originalTheme from './themes/original'

const Stack = createNativeStackNavigator()

const AppRouter = () => {
  const [translate] = useTranslation(SCREENS_HEADER_KEY)

  const options = {
    headerTintColor: originalTheme.colors.secondary,
    headerStyle: {
      backgroundColor: originalTheme.colors.tertiary
    },
    headerBackTitle: translate('buttons.goBack'),
    headerBackTitleStyle: {
      fontFamily: 'RSC-Regular'
    },
    headerTitleStyle: {
      fontFamily: 'RSC-Regular',
      fontSize: 22
    }
  }

  const screenOptions = {
    [PRINCIPAL_SCREEN_KEY]: {
      headerShown: false
    },
    [NEW_REGISTER_SCREEN_KEY]: {
      title: translate(`screens.titles.${NEW_REGISTER_SCREEN_KEY}`),
      ...options
    },
    [NEW_PURCHASE_SCREEN_KEY]: {
      title: translate(`screens.titles.${NEW_PURCHASE_SCREEN_KEY}`),
      ...options
    },
    [VIEW_PURCHASES_SCREEN_KEY]: {
      title: translate(`screens.titles.${VIEW_PURCHASES_SCREEN_KEY}`),
      ...options
    },
    [NEW_BILL_SCREEN_KEY]: {
      title: translate(`screens.titles.${NEW_BILL_SCREEN_KEY}`),
      ...options
    },
    [STATISTICS_SCREEN_KEY]: {
      title: translate(`screens.titles.${STATISTICS_SCREEN_KEY}`),
      ...options
    },
    [APP_SETTINGS_SCREEN_KEY]: {
      title: translate(`screens.titles.${APP_SETTINGS_SCREEN_KEY}`),
      ...options
    }
  }

  return (
    <NavigationContainer theme={originalTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={PRINCIPAL_SCREEN_KEY}
          options={screenOptions[PRINCIPAL_SCREEN_KEY]}
          component={Principal}
        />
        <Stack.Screen
          name={NEW_REGISTER_SCREEN_KEY}
          options={screenOptions[NEW_REGISTER_SCREEN_KEY]}
          component={NewRegister}
        />
        <Stack.Screen
          name={NEW_PURCHASE_SCREEN_KEY}
          options={screenOptions[NEW_PURCHASE_SCREEN_KEY]}
          component={NewPurchase}
        />
        <Stack.Screen
          name={VIEW_PURCHASES_SCREEN_KEY}
          options={screenOptions[VIEW_PURCHASES_SCREEN_KEY]}
          component={ViewPurchases}
        />
        <Stack.Screen
          name={NEW_BILL_SCREEN_KEY}
          options={screenOptions[NEW_BILL_SCREEN_KEY]}
          component={NewBill}
        />
        <Stack.Screen
          name={STATISTICS_SCREEN_KEY}
          options={screenOptions[STATISTICS_SCREEN_KEY]}
          component={Statistics}
        />
        <Stack.Screen
          name={APP_SETTINGS_SCREEN_KEY}
          options={screenOptions[APP_SETTINGS_SCREEN_KEY]}
          component={AppSettings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter
