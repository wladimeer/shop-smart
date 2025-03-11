import originalTheme from '../themes/original'
import { useTranslation } from 'react-i18next'

// Constants
import { SCREENS_HEADER_KEY } from '../constants/headers'
import { APP_SETTINGS_SCREEN_KEY, NEW_REGISTER_SCREEN_KEY } from '../constants/screens'
import { VIEW_PURCHASES_SCREEN_KEY, NEW_PURCHASE_SCREEN_KEY } from '../constants/screens'
import { PRINCIPAL_SCREEN_KEY, STATISTICS_SCREEN_KEY } from '../constants/screens'
import { NEW_BILL_SCREEN_KEY } from '../constants/screens'

const useScreenOptions = () => {
  const [translate] = useTranslation(SCREENS_HEADER_KEY)

  const options = {
    headerBackTitle: translate('buttons.goBack'),
    headerTintColor: originalTheme.colors.secondary,
    headerBackTitleStyle: {
      fontFamily: 'RSC-Regular'
    },
    headerTitleStyle: {
      fontFamily: 'RSC-Regular',
      fontSize: 22
    },
    headerStyle: {
      backgroundColor: originalTheme.colors.tertiary
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

  return screenOptions
}

export default useScreenOptions
