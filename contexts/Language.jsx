import { useTranslation } from 'react-i18next'
import React, { useEffect, createContext, useState, useContext } from 'react'
import { DEFAULT_LANGUAGE_CODE, VALID_LANGUAGE_CODES } from '../constants/locales'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_KEY } from '../constants/storage'

const LanguageContext = createContext()

const LanguageProvider = ({ children }) => {
  const [_, { changeLanguage }] = useTranslation()
  const [languageData, setLanguageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateLanguageData = async (languageData = null) => {
    let definedLanguage = DEFAULT_LANGUAGE_CODE

    if (languageData !== null && VALID_LANGUAGE_CODES.includes(languageData)) {
      definedLanguage = languageData
    }

    await AsyncStorage.setItem(LANGUAGE_KEY, definedLanguage)
    setLanguageData(definedLanguage)
    changeLanguage(definedLanguage)
  }

  useEffect(() => {
    const loadLanguage = async () => {
      const exist = await AsyncStorage.getItem(LANGUAGE_KEY)

      if (exist != null) {
        const languageData = await AsyncStorage.getItem(LANGUAGE_KEY)
        updateLanguageData(languageData)
      } else {
        updateLanguageData()
      }

      setLoading(false)
    }

    loadLanguage()
  }, [])

  return (
    <LanguageContext.Provider value={{ languageData, updateLanguageData }}>
      {!loading && children}
    </LanguageContext.Provider>
  )
}

const useLanguage = () => {
  const { languageData, updateLanguageData } = useContext(LanguageContext)
  return { languageData, updateLanguageData }
}

export { LanguageProvider, useLanguage }
