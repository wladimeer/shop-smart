import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SCREEN_KEYS } from '../constants/screens'

type RootStackParamList = {
  [SCREEN_KEYS.PRINCIPAL]: undefined
  [SCREEN_KEYS.NEW_REGISTER]: undefined
  [SCREEN_KEYS.NEW_PURCHASE]: undefined
  [SCREEN_KEYS.VIEW_PURCHASES]: undefined
  [SCREEN_KEYS.NEW_BILL]: undefined
  [SCREEN_KEYS.APP_SETTINGS]: undefined
  [SCREEN_KEYS.STATISTICS]: undefined
}

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

export { RootStackParamList, ScreenProps }
