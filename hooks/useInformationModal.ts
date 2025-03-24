import { useReducer } from 'react'
import type ActionType from 'types/action-type.type'
import type InformationModal from 'interfaces/information-modal.interface'

const useInformationModal = () => {
  const initialState: InformationModal = {
    visible: false,
    title: '',
    items: {}
  }

  const reducer = (state: InformationModal, action: ActionType): InformationModal => {
    switch (action.type) {
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload }
      case 'SET_TITLE':
        return { ...state, title: action.payload }
      case 'SET_ITEMS':
        return { ...state, items: action.payload }
      case 'SET_RESET':
        return initialState
      default:
        return state
    }
  }

  const [informationModal, dispatch] = useReducer(reducer, initialState)

  const setInformationModal = (payload: InformationModal) => {
    dispatch({ type: 'SET_VISIBLE', payload: payload.visible })
    dispatch({ type: 'SET_TITLE', payload: payload.title })

    if (payload.items !== undefined) {
      dispatch({ type: 'SET_ITEMS', payload: payload.items })
    }
  }

  const resetInformationModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { informationModal, setInformationModal, resetInformationModal }
}

export default useInformationModal
