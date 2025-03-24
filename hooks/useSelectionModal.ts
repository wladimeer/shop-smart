import { useReducer } from 'react'
import type ActionType from 'types/action-type.type'
import type SelectionModal from 'interfaces/selection-modal.interface'

const useSelectionModal = () => {
  const initialState: SelectionModal = {
    visible: false,
    title: '',
    options: []
  }

  const reducer = (state: SelectionModal, action: ActionType) => {
    switch (action.type) {
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload }
      case 'SET_TITLE':
        return { ...state, title: action.payload }
      case 'SET_OPTIONS':
        return { ...state, options: action.payload }
      case 'SET_ACTION':
        return { ...state, action: action.payload }
      case 'SET_CONFIRM':
        return { ...state, confirm: action.payload }
      case 'SET_CANCEL':
        return { ...state, cancel: action.payload }
      case 'SET_RESET':
        return initialState
      default:
        return state
    }
  }

  const [selectionModal, dispatch] = useReducer(reducer, initialState)

  const setSelectionModal = (payload: SelectionModal) => {
    dispatch({ type: 'SET_VISIBLE', payload: payload.visible })
    dispatch({ type: 'SET_TITLE', payload: payload.title })
    dispatch({ type: 'SET_OPTIONS', payload: payload.options })

    if (payload.action !== undefined) {
      dispatch({ type: 'SET_ACTION', payload: payload.action })
    }

    if (payload.confirm !== undefined) {
      dispatch({ type: 'SET_CONFIRM', payload: payload.confirm })
    }

    if (payload.cancel !== undefined) {
      dispatch({ type: 'SET_CANCEL', payload: payload.cancel })
    }
  }

  const resetSelectionModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { selectionModal, setSelectionModal, resetSelectionModal }
}

export default useSelectionModal
