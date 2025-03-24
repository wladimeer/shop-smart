import { useTranslation } from 'react-i18next'
import React, { useEffect, createContext, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_CODES } from '../constants/locales'
import { STORAGE_KEYS } from '../constants/storage'
import moment from 'moment'

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [_, { changeLanguage }] = useTranslation()
  const [languageCode, setLanguageCode] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateLanguageCode = async (languageCode = null) => {
    let definedCode = LANGUAGE_CODES.DEFAULT

    if ([LANGUAGE_CODES.ENGLISH, LANGUAGE_CODES.SPANISH].includes(languageCode)) {
      definedCode = languageCode
    }

    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, definedCode)
    setLanguageCode(definedCode)
    changeLanguage(definedCode)
    moment.locale(definedCode)
  }

  useEffect(() => {
    const loadLanguageCode = async () => {
      const exist = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE)

      if (exist != null) {
        const languageCode = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE)
        updateLanguageCode(languageCode)
      } else {
        updateLanguageCode()
      }

      setLoading(false)
    }

    loadLanguageCode()
  }, [])

  return (
    <LanguageContext.Provider value={{ languageCode, updateLanguageCode }}>
      {!loading && languageCode && children}
    </LanguageContext.Provider>
  )
}

const useLanguage = () => {
  return useContext(LanguageContext)
}

export { LanguageProvider, useLanguage }
