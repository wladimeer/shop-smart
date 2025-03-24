import resources from './resources'
import type { ScreenKey } from './screen.types'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof ScreenKey
  }
}
