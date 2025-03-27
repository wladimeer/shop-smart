import { create } from 'zustand'
import type { Language } from 'types/language.types'
import { persist, createJSONStorage } from 'zustand/middleware'
import type LanguageStore from 'interfaces/language-store.interface'
import { LANGUAGE_CODES } from '../constants/locales'
import { STORAGE_KEYS } from '../constants/storage'
import { locale } from 'dayjs'

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: LANGUAGE_CODES.DEFAULT,
      setLanguage: async (language: Language) => {
        set({ language })
        locale(language)
      }
    }),
    {
      name: STORAGE_KEYS.LANGUAGE,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useLanguageStore }
