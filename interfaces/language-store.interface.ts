import type { Language } from 'types/language.types'

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => Promise<void>
}

export default LanguageStore
