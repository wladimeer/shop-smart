import originalTheme from './themes/original'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import useScreenOptions from './hooks/useScreenOptions'

// Screen components
import Statistics from './screens/private/Statistics'
import NewRegister from './screens/private/NewRegister'
import ViewPurchases from './screens/private/ViewPurchases'
import NewPurchase from './screens/private/NewPurchase'
import AppSettings from './screens/private/AppSettings'
import Principal from './screens/public/Principal'
import NewBill from './screens/private/NewBill'

// Constants
import { APP_SETTINGS_SCREEN_KEY, NEW_REGISTER_SCREEN_KEY } from './constants/screens'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { PRINCIPAL_SCREEN_KEY, STATISTICS_SCREEN_KEY } from './constants/screens'
import { NEW_BILL_SCREEN_KEY } from './constants/screens'

const Stack = createNativeStackNavigator()

const AppRouter = () => {
  const screenOptions = useScreenOptions()

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
