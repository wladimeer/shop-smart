import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentDatetime, isBeforeDatetime, isAfterDatetime } from '../utils/time'
import type { Purchase, Purchases } from 'interfaces/purchase.interfaces'
import type { DateTimeFormat } from 'types/date.types'
import { STORAGE_KEYS } from '../constants/storage'
import { v4 as randomId } from 'uuid'

const setCartElements = (purchaseList: Purchase[]): Promise<Purchase[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CART_ELEMENTS, JSON.stringify(purchaseList))
      resolve(purchaseList)
    } catch (error) {
      reject(error)
    }
  })
}

const getCartElements = (): Promise<Purchase[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let purchaseList: Purchase[] = []
      const savedData = await AsyncStorage.getItem(STORAGE_KEYS.CART_ELEMENTS)

      if (savedData !== null) purchaseList = JSON.parse(savedData) as Purchase[]
      resolve(purchaseList)
    } catch (error) {
      reject(error)
    }
  })
}

const setElementsList = (purchaseList: Purchase[]): Promise<Purchases[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const purchasesList = await getElementsList()
      const currentDatetime = getCurrentDatetime()
      const total = purchaseList.reduce((acc, { total }) => acc + Number(total), 0)

      const purchases: Purchases = {
        id: randomId(),
        createdAt: currentDatetime,
        updatedAt: currentDatetime,
        elements: purchaseList,
        total
      }

      const newPurchasesList = [...purchasesList, purchases] as Purchases[]

      await AsyncStorage.setItem(STORAGE_KEYS.ELEMENTS_LIST, JSON.stringify(newPurchasesList))
      resolve(newPurchasesList)
    } catch (error) {
      reject(error)
    }
  })
}

const getElementsList = (): Promise<Purchases[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let purchasesList: Purchases[] = []
      const savedElements: string | null = await AsyncStorage.getItem(STORAGE_KEYS.ELEMENTS_LIST)

      if (savedElements !== null) purchasesList = JSON.parse(savedElements) as Purchases[]

      purchasesList.sort((a, b) => {
        const isAfter = isAfterDatetime(
          a.createdAt as DateTimeFormat,
          b.createdAt as DateTimeFormat
        )

        const isBefore = isBeforeDatetime(
          a.createdAt as DateTimeFormat,
          b.createdAt as DateTimeFormat
        )

        return isAfter ? -1 : isBefore ? 1 : 0
      })

      resolve(purchasesList)
    } catch (error) {
      reject(error)
    }
  })
}

const removeElementList = (elementListId: number): Promise<Purchases[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const purchasesList = await getElementsList()
      const purchasesListIndexes: Record<string, number> = {}

      purchasesList.forEach(({ id }, index: number) => (purchasesListIndexes[id] = index))
      purchasesList.splice(purchasesListIndexes[elementListId], 1)

      await AsyncStorage.setItem(STORAGE_KEYS.ELEMENTS_LIST, JSON.stringify(purchasesList))
      resolve(purchasesList)
    } catch (error) {
      reject(error)
    }
  })
}

export { setCartElements, getCartElements, setElementsList, getElementsList, removeElementList }
