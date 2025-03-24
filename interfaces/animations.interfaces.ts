interface BaseAnimations {
  isVisible: boolean
}

interface FadeScaleAnimations extends BaseAnimations {
  bounciness: boolean
}

interface FadeExpandAnimations extends BaseAnimations {
  expandedHeight: number
}

export { FadeScaleAnimations, FadeExpandAnimations }
