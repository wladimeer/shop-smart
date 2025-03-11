import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Locales - Spanish
import newBillES from '../locales/es/newBill.json'
import principalES from '../locales/es/principal.json'
import appSettingsES from '../locales/es/appSettings.json'
import screensHeaderES from '../locales/es/screensHeader.json'
import variantFeaturesES from '../locales/es/variantFeatures.json'
import viewPurchasesES from '../locales/es/viewPurchases.json'
import newRegisterES from '../locales/es/newRegister.json'
import newPurchaseES from '../locales/es/newPurchase.json'
import statisticsES from '../locales/es/statistics.json'

// Constants
import { SCREENS_HEADER_KEY } from '../constants/headers'
import { VARIANT_FEATURES_MODAL_KEY } from '../constants/modals'
import { SPANISH_LANGUAGE_CODE, ENGLISH_LANGUAGE_CODE } from '../constants/locales'
import { VIEW_PURCHASES_SCREEN_KEY, PRINCIPAL_SCREEN_KEY } from '../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY, APP_SETTINGS_SCREEN_KEY } from '../constants/screens'
import { STATISTICS_SCREEN_KEY, NEW_REGISTER_SCREEN_KEY } from '../constants/screens'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from '../constants/locales'
import { NEW_BILL_SCREEN_KEY } from '../constants/screens'

// Locales - English
import newBillEN from '../locales/en/newBill.json'
import principalEN from '../locales/en/principal.json'
import appSettingsEN from '../locales/en/appSettings.json'
import screensHeaderEN from '../locales/en/screensHeader.json'
import variantFeaturesEN from '../locales/en/variantFeatures.json'
import viewPurchasesEN from '../locales/en/viewPurchases.json'
import newRegisterEN from '../locales/en/newRegister.json'
import newPurchaseEN from '../locales/en/newPurchase.json'
import statisticsEN from '../locales/en/statistics.json'

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
  resources: {
    [SPANISH_LANGUAGE_CODE]: {
      [PRINCIPAL_SCREEN_KEY]: principalES,
      [NEW_REGISTER_SCREEN_KEY]: newRegisterES,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseES,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesES,
      [NEW_BILL_SCREEN_KEY]: newBillES,
      [VARIANT_FEATURES_MODAL_KEY]: variantFeaturesES,
      [APP_SETTINGS_SCREEN_KEY]: appSettingsES,
      [STATISTICS_SCREEN_KEY]: statisticsES,
      [SCREENS_HEADER_KEY]: screensHeaderES
    },
    [ENGLISH_LANGUAGE_CODE]: {
      [PRINCIPAL_SCREEN_KEY]: principalEN,
      [NEW_REGISTER_SCREEN_KEY]: newRegisterEN,
      [NEW_PURCHASE_SCREEN_KEY]: newPurchaseEN,
      [VIEW_PURCHASES_SCREEN_KEY]: viewPurchasesEN,
      [NEW_BILL_SCREEN_KEY]: newBillEN,
      [VARIANT_FEATURES_MODAL_KEY]: variantFeaturesEN,
      [APP_SETTINGS_SCREEN_KEY]: appSettingsEN,
      [STATISTICS_SCREEN_KEY]: statisticsEN,
      [SCREENS_HEADER_KEY]: screensHeaderEN
    }
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  lng: VALID_LANGUAGE_CODES
})
