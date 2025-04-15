import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Locales - Spanish
import newBillES from '../locales/es/newBill.json'
import principalES from '../locales/es/principal.json'
import appSettingsES from '../locales/es/appSettings.json'
import screensHeaderES from '../locales/es/screensHeader.json'
import variantFeaturesES from '../locales/es/variantFeatures.json'
import viewPurchasesES from '../locales/es/viewPurchases.json'
import newPurchaseES from '../locales/es/newPurchase.json'
import statisticsES from '../locales/es/statistics.json'
import viewBillsES from '../locales/es/viewBills.json'

// Constants
import { HEADER_KEYS } from '../constants/headers'
import { LANGUAGE_CODES } from '../constants/locales'
import { SCREEN_KEYS } from '../constants/screens'
import { MODAL_KEYS } from '../constants/modals'

// Locales - English
import newBillEN from '../locales/en/newBill.json'
import principalEN from '../locales/en/principal.json'
import appSettingsEN from '../locales/en/appSettings.json'
import screensHeaderEN from '../locales/en/screensHeader.json'
import variantFeaturesEN from '../locales/en/variantFeatures.json'
import viewPurchasesEN from '../locales/en/viewPurchases.json'
import newPurchaseEN from '../locales/en/newPurchase.json'
import statisticsEN from '../locales/en/statistics.json'
import viewBillsEN from '../locales/en/viewBills.json'

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
  resources: {
    [LANGUAGE_CODES.SPANISH]: {
      [SCREEN_KEYS.PRINCIPAL]: principalES,
      [SCREEN_KEYS.NEW_PURCHASE]: newPurchaseES,
      [SCREEN_KEYS.VIEW_PURCHASES]: viewPurchasesES,
      [SCREEN_KEYS.VIEW_BILLS]: viewBillsES,
      [SCREEN_KEYS.NEW_BILL]: newBillES,
      [MODAL_KEYS.VARIANT_FEATURES]: variantFeaturesES,
      [SCREEN_KEYS.APP_SETTINGS]: appSettingsES,
      [SCREEN_KEYS.STATISTICS]: statisticsES,
      [HEADER_KEYS.SCREEN]: screensHeaderES
    },
    [LANGUAGE_CODES.ENGLISH]: {
      [SCREEN_KEYS.PRINCIPAL]: principalEN,
      [SCREEN_KEYS.NEW_PURCHASE]: newPurchaseEN,
      [SCREEN_KEYS.VIEW_PURCHASES]: viewPurchasesEN,
      [SCREEN_KEYS.VIEW_BILLS]: viewBillsEN,
      [SCREEN_KEYS.NEW_BILL]: newBillEN,
      [MODAL_KEYS.VARIANT_FEATURES]: variantFeaturesEN,
      [SCREEN_KEYS.APP_SETTINGS]: appSettingsEN,
      [SCREEN_KEYS.STATISTICS]: statisticsEN,
      [HEADER_KEYS.SCREEN]: screensHeaderEN
    }
  },
  fallbackLng: LANGUAGE_CODES.DEFAULT,
  lng: LANGUAGE_CODES.SPANISH
})
