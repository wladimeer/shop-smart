import originalTheme from './themes/original'
import Statistics from './screens/private/Statistics'
import useScreenOptions from './hooks/useScreenOptions'
import NewRegister from './screens/private/NewRegister'
import type { RootStackParamList } from 'types/navigation.types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import ViewPurchases from './screens/private/ViewPurchases'
import NewPurchase from './screens/private/NewPurchase'
import AppSettings from './screens/private/AppSettings'
import Principal from './screens/public/Principal'
import { SCREEN_KEYS } from './constants/screens'
import NewBill from './screens/private/NewBill'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppRouter = () => {
  const screenOptions = useScreenOptions()

  return (
    <NavigationContainer theme={originalTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREEN_KEYS.PRINCIPAL}
          options={screenOptions[SCREEN_KEYS.PRINCIPAL]}
          component={Principal}
        />
        <Stack.Screen
          name={SCREEN_KEYS.NEW_REGISTER}
          options={screenOptions[SCREEN_KEYS.NEW_REGISTER]}
          component={NewRegister}
        />
        <Stack.Screen
          name={SCREEN_KEYS.NEW_PURCHASE}
          options={screenOptions[SCREEN_KEYS.NEW_PURCHASE]}
          component={NewPurchase}
        />
        <Stack.Screen
          name={SCREEN_KEYS.VIEW_PURCHASES}
          options={screenOptions[SCREEN_KEYS.VIEW_PURCHASES]}
          component={ViewPurchases}
        />
        <Stack.Screen
          name={SCREEN_KEYS.NEW_BILL}
          options={screenOptions[SCREEN_KEYS.NEW_BILL]}
          component={NewBill}
        />
        <Stack.Screen
          name={SCREEN_KEYS.STATISTICS}
          options={screenOptions[SCREEN_KEYS.STATISTICS]}
          component={Statistics}
        />
        <Stack.Screen
          name={SCREEN_KEYS.APP_SETTINGS}
          options={screenOptions[SCREEN_KEYS.APP_SETTINGS]}
          component={AppSettings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter
