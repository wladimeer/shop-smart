import React from 'react'
import { Image, StyleSheet } from 'react-native'
import background from '../assets/background.jpg'

const BackgroundImage = () => {
  return <Image source={background} style={styles.background} blurRadius={3} resizeMode="cover" />
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000'
  }
})

export default BackgroundImage
