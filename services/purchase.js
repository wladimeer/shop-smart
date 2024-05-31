import AsyncStorage from '@react-native-async-storage/async-storage'
import { CART_ELEMENTS_KEY } from '../constants/storage'

const setCartElements = (elements) => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(CART_ELEMENTS_KEY, JSON.stringify(elements))
      resolve(elements)
    } catch (error) {
      reject(error)
    }
  })
}

const getCartElements = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = []
      const elements = await AsyncStorage.getItem(CART_ELEMENTS_KEY)

      if (elements !== null) items = JSON.parse(elements)
      resolve(items)
    } catch (error) {
      reject(error)
    }
  })
}

export { setCartElements, getCartElements }
