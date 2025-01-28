import { useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const useFadeExpandAnimation = (isVisible, expandedHeight = 166) => {
  const fadeOpacity = useSharedValue(0)
  const expandHeight = useSharedValue(0)

  const handleVisibilityChange = () => {
    const toValueFade = isVisible ? 1 : 0
    const toValueExpand = isVisible ? expandedHeight : 0

    fadeOpacity.value = withTiming(toValueFade, {
      duration: 500
    })

    expandHeight.value = withTiming(toValueExpand, {
      duration: 150
    })
  }

  useEffect(handleVisibilityChange, [isVisible])

  return { fadeOpacity, expandHeight }
}

export default useFadeExpandAnimation
