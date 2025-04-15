import originalTheme from '../themes/original'
import { HEADER_KEYS } from '../constants/headers'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type ScreenOptions from 'types/screen-options.type'
import type Translation from 'types/translation.type'
import { SCREEN_KEYS } from '../constants/screens'
import { useTranslation } from 'react-i18next'

const useScreenOptions = (): ScreenOptions => {
  const { t }: Translation = useTranslation(HEADER_KEYS.SCREEN)

  const options: NativeStackNavigationOptions = {
    headerBackTitle: t('buttons.goBack'),
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

  const screenOptions: ScreenOptions = {
    [SCREEN_KEYS.PRINCIPAL]: {
      headerShown: false
    },
    [SCREEN_KEYS.NEW_PURCHASE]: {
      title: t(`screens.titles.${SCREEN_KEYS.NEW_PURCHASE}`),
      ...options
    },
    [SCREEN_KEYS.VIEW_PURCHASES]: {
      title: t(`screens.titles.${SCREEN_KEYS.VIEW_PURCHASES}`),
      ...options
    },
    [SCREEN_KEYS.VIEW_BILLS]: {
      title: t(`screens.titles.${SCREEN_KEYS.VIEW_BILLS}`),
      ...options
    },
    [SCREEN_KEYS.NEW_BILL]: {
      title: t(`screens.titles.${SCREEN_KEYS.NEW_BILL}`),
      ...options
    },
    [SCREEN_KEYS.STATISTICS]: {
      title: t(`screens.titles.${SCREEN_KEYS.STATISTICS}`),
      ...options
    },
    [SCREEN_KEYS.APP_SETTINGS]: {
      title: t(`screens.titles.${SCREEN_KEYS.APP_SETTINGS}`),
      ...options
    }
  }

  return screenOptions
}

export default useScreenOptions
