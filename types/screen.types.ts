type ScreenKey =
  | 'PRINCIPAL'
  | 'NEW_PURCHASE'
  | 'VIEW_PURCHASES'
  | 'VIEW_BILLS'
  | 'NEW_BILL'
  | 'APP_SETTINGS'
  | 'STATISTICS'

type Screen =
  | 'principalScreen'
  | 'newPurchaseScreen'
  | 'viewPurchasesScreen'
  | 'viewBillsScreen'
  | 'newBillScreen'
  | 'appSettingsScreen'
  | 'statisticsScreen'

export { ScreenKey, Screen }
