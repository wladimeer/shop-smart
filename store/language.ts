import { create } from 'zustand'
import type { Language } from 'types/language.types'
import { createJSONStorage } from 'zustand/middleware'
import type LanguageStore from 'interfaces/language-store.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LANGUAGE_CODES } from '../constants/locales'
import { STORAGE_KEYS } from '../constants/storage'
import { persist } from 'expo-zustand-persist'

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: LANGUAGE_CODES.DEFAULT,
      setLanguage: async (language: Language) => set({ language })
    }),
    {
      name: STORAGE_KEYS.LANGUAGE,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export { useLanguageStore }
