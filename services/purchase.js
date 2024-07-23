import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CART_ELEMENTS_KEY, ELEMENTS_LIST_KEY } from '../constants/storage'
import { getCurrentDatetime } from '../utils/time'
import { v4 as randomId } from 'uuid'

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

const setElementsList = (elements) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentDatetime = getCurrentDatetime()

      const elementsList = {
        id: randomId(),
        createdAt: currentDatetime,
        updatedAt: currentDatetime,
        elements
      }

      await AsyncStorage.setItem(ELEMENTS_LIST_KEY, JSON.stringify(elementsList))
      resolve(elementsList)
    } catch (error) {
      reject(error)
    }
  })
}

const getElementsList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let elementsList = {}
      const savedElements = await AsyncStorage.getItem(ELEMENTS_LIST_KEY)

      if (savedElements !== null) elementsList = JSON.parse(savedElements)
      resolve(elementsList)
    } catch (error) {
      reject(error)
    }
  })
}

export { setCartElements, getCartElements, setElementsList, getElementsList }
