import NewPurchase from './screens/private/NewPurchase'
import { SCREENS_HEADER_KEY } from './constants/headers'
import ViewPurchases from './screens/private/ViewPurchases'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from './constants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { PRINCIPAL_SCREEN_KEY } from './constants/screens'
import Principal from './screens/public/Principal'
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
    [NEW_PURCHASE_SCREEN_KEY]: {
      title: translate(`screens.titles.${NEW_PURCHASE_SCREEN_KEY}`),
      ...options
    },
    [VIEW_PURCHASES_SCREEN_KEY]: {
      title: translate(`screens.titles.${VIEW_PURCHASES_SCREEN_KEY}`),
      ...options
    }
  }

  return (
    <NavigationContainer theme={originalTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={PRINCIPAL_SCREEN_KEY}
          options={{ headerShown: false }}
          component={Principal}
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRouter
