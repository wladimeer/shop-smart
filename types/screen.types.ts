type ScreenKey =
  | 'PRINCIPAL'
  | 'NEW_PURCHASE'
  | 'VIEW_PURCHASES'
  | 'NEW_BILL'
  | 'APP_SETTINGS'
  | 'STATISTICS'

type Screen =
  | 'principalScreen'
  | 'newPurchaseScreen'
  | 'viewPurchasesScreen'
  | 'newBillScreen'
  | 'appSettingsScreen'
  | 'statisticsScreen'

export { ScreenKey, Screen }
