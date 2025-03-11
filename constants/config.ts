const APP_VARIANT: string | undefined = process.env.EXPO_PUBLIC_APP_VARIANT

const FREE_VARIANT: string = 'free'
const PAID_VARIANT: string = 'paid'

const DEFAULT_BOTTOM_INSET: number = 32

const ALL_VARIANTS = [FREE_VARIANT, PAID_VARIANT] as const

export { APP_VARIANT, FREE_VARIANT, PAID_VARIANT, ALL_VARIANTS, DEFAULT_BOTTOM_INSET }
