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

export { APP_VARIANT, APP_VARIANTS, DEFAULT_INSETS }
