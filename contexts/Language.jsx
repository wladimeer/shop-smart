import { useTranslation } from 'react-i18next'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from '../constants/locales'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_KEY } from '../constants/storage'

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [_, { changeLanguage }] = useTranslation()
  const [languageCode, setLanguageCode] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateLanguageCode = async (languageCode = null) => {
    let definedCode = DEFAULT_LANGUAGE_CODE

    if (VALID_LANGUAGE_CODES.includes(languageCode)) {
      definedCode = languageCode
    }

    await AsyncStorage.setItem(LANGUAGE_KEY, definedCode)
    setLanguageCode(definedCode)
    changeLanguage(definedCode)
  }

  useEffect(() => {
    const loadLanguageCode = async () => {
      const exist = await AsyncStorage.getItem(LANGUAGE_KEY)

      if (exist != null) {
        const languageCode = await AsyncStorage.getItem(LANGUAGE_KEY)
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
