import type { VariantKey, Variant } from 'types/variant.types'
import type { InsetKey } from 'types/inset.types'

const APP_VARIANT: string | undefined = process.env.EXPO_PUBLIC_APP_VARIANT

const APP_VARIANTS: Record<VariantKey, Variant> = {
  FREE: 'free',
  PAID: 'paid'
}

const DEFAULT_INSETS: Record<InsetKey, number> = {
  BOTTOM: 32
}

const BASE_COLORS: string[] = [
  '#4F2E5F',
  '#60346F',
  '#724080',
  '#844C91',
  '#9556A1',
  '#A562B1',
  '#B06EC1',
  '#C17AD1'
] as const

export { APP_VARIANT, APP_VARIANTS, DEFAULT_INSETS, BASE_COLORS }
