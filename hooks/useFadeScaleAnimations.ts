import { useSharedValue } from 'react-native-reanimated'
import { withTiming, withSpring, Easing } from 'react-native-reanimated'
import type { FadeScaleAnimations } from 'interfaces/animations.interfaces'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { useEffect } from 'react'

const useFadeScaleAnimations = ({ isVisible, bounciness = true }: FadeScaleAnimations) => {
  const scaleWidth = useSharedValue<number>(0)
  const fadeOpacity = useSharedValue<number>(0)
  const scaleHeight = useSharedValue<number>(0)

  const animationFunction = bounciness ? withSpring : withTiming

  const handleVisibilityChange = () => {
    const toValue = isVisible ? 1 : 0

    if (isVisible) impactAsync(ImpactFeedbackStyle.Soft)

    scaleWidth.value = animationFunction(toValue, {
      duration: isVisible ? 150 : 100
    })

    fadeOpacity.value = withTiming(toValue, {
      duration: isVisible ? 50 : 100,
      easing: Easing.inOut(Easing.ease)
    })

    scaleHeight.value = animationFunction(toValue, {
      duration: isVisible ? 150 : 100
    })
  }

  useEffect(handleVisibilityChange, [isVisible])

  return { scaleWidth, fadeOpacity, scaleHeight }
}

export default useFadeScaleAnimations
