import type FeatureSection from 'interfaces/feature-section.interface'
import type Option from 'interfaces/option.interface'

type ActionType =
  | { type: 'SET_VISIBLE'; payload: boolean }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'SET_ITEMS'; payload: Record<string, FeatureSection> }
  | { type: 'SET_OPTIONS'; payload: Option[] }
  | { type: 'SET_ACTION'; payload: () => void }
  | { type: 'SET_CONFIRM'; payload: string }
  | { type: 'SET_CANCEL'; payload: string }
  | { type: 'SET_RESET' }

export default ActionType
