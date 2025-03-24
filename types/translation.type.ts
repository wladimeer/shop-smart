import type { UseTranslationResponse } from 'react-i18next'
import type { Screen } from './screen.types'
import type { Header } from './header.types'

type Translation = UseTranslationResponse<Header | Screen, undefined>

export default Translation
