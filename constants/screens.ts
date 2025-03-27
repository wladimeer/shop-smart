import type { ScreenKey, Screen } from 'types/screen.types'

const SCREEN_KEYS: Record<ScreenKey, Screen> = {
  PRINCIPAL: 'principalScreen',
  NEW_PURCHASE: 'newPurchaseScreen',
  VIEW_PURCHASES: 'viewPurchasesScreen',
  NEW_BILL: 'newBillScreen',
  APP_SETTINGS: 'appSettingsScreen',
  STATISTICS: 'statisticsScreen'
}

export { SCREEN_KEYS }
