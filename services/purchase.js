import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentDatetime, isBeforeDatetime, isAfterDatetime } from '../utils/time'
import { CART_ELEMENTS_KEY, ELEMENTS_LIST_KEY } from '../constants/storage'
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
      const response = await getElementsList()
      const currentDatetime = getCurrentDatetime()
      const total = elements.reduce((acc, { total }) => acc + Number(total), 0)

      const elementList = {
        id: randomId(),
        createdAt: currentDatetime,
        updatedAt: currentDatetime,
        elements,
        total
      }

      const elementLists = [...response, elementList]

      await AsyncStorage.setItem(ELEMENTS_LIST_KEY, JSON.stringify(elementLists))
      resolve(elementLists)
    } catch (error) {
      reject(error)
    }
  })
}

const getElementsList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let elementLists = []
      const savedElements = await AsyncStorage.getItem(ELEMENTS_LIST_KEY)

      if (savedElements !== null) elementLists = [...JSON.parse(savedElements)]

      elementLists.sort((a, b) => {
        const isAfter = isAfterDatetime(a.createdAt, b.createdAt)
        const isBefore = isBeforeDatetime(a.createdAt, b.createdAt)

        return isAfter ? -1 : isBefore ? 1 : 0
      })

      resolve(elementLists)
    } catch (error) {
      reject(error)
    }
  })
}

const removeElementList = (elementListId = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getElementsList()
      const itemIndexes = {}

      response.forEach(({ id }, index) => (itemIndexes[id] = index))
      response.splice(itemIndexes[elementListId], 1)

      await AsyncStorage.setItem(ELEMENTS_LIST_KEY, JSON.stringify(response))
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export { setCartElements, getCartElements, setElementsList, getElementsList, removeElementList }
