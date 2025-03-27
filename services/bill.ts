import 'react-native-get-random-values'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getCurrentDatetime, isBeforeDatetime, isAfterDatetime } from '../utils/time'
import type { Bill, Bills } from 'interfaces/bill-interfaces'
import type { DateTimeFormat } from 'types/date.types'
import { STORAGE_KEYS } from '../constants/storage'
import { v4 as randomId } from 'uuid'

const setBillElements = (billList: Bill[]): Promise<Bill[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BILL_ELEMENTS, JSON.stringify(billList))
      resolve(billList)
    } catch (error) {
      reject(error)
    }
  })
}

const getBillElements = (): Promise<Bill[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let billList: Bill[] = []
      const savedData = await AsyncStorage.getItem(STORAGE_KEYS.BILL_ELEMENTS)

      if (savedData !== null) billList = JSON.parse(savedData) as Bill[]
      resolve(billList)
    } catch (error) {
      reject(error)
    }
  })
}

const setBillsList = (billList: Bill[]): Promise<Bills[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const billsList = await getBillsList()
      const currentDatetime = getCurrentDatetime()
      const total = billList.reduce((acc, { amount }) => acc + Number(amount), 0)

      const bills: Bills = {
        id: randomId(),
        createdAt: currentDatetime,
        updatedAt: currentDatetime,
        elements: billList,
        total
      }

      const newBillsList = [...billsList, bills] as Bills[]

      await AsyncStorage.setItem(STORAGE_KEYS.BILLS_LIST, JSON.stringify(newBillsList))
      resolve(newBillsList)
    } catch (error) {
      reject(error)
    }
  })
}

const getBillsList = (): Promise<Bills[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let billsList: Bills[] = []
      const savedData: string | null = await AsyncStorage.getItem(STORAGE_KEYS.BILLS_LIST)

      if (savedData !== null) billsList = JSON.parse(savedData) as Bills[]

      billsList.sort((a, b) => {
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

      resolve(billsList)
    } catch (error) {
      reject(error)
    }
  })
}

const removeBillList = (elementListId: number): Promise<Bills[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const billsList = await getBillsList()
      const billsListIndexes: Record<string, number> = {}

      billsList.forEach(({ id }, index: number) => (billsListIndexes[id] = index))
      billsList.splice(billsListIndexes[elementListId], 1)

      await AsyncStorage.setItem(STORAGE_KEYS.BILLS_LIST, JSON.stringify(billsList))
      resolve(billsList)
    } catch (error) {
      reject(error)
    }
  })
}

export { setBillElements, getBillElements, setBillsList, getBillsList, removeBillList }
