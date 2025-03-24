import { useReducer } from 'react'
import type ActionType from 'types/action-type.type'
import type ActionModal from 'interfaces/action-modal.interface'

const useActionModal = () => {
  const initialState: ActionModal = {
    visible: false,
    title: '',
    message: ''
  }

  const reducer = (state: ActionModal, action: ActionType): ActionModal => {
    switch (action.type) {
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload }
      case 'SET_TITLE':
        return { ...state, title: action.payload }
      case 'SET_MESSAGE':
        return { ...state, message: action.payload }
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

  const [actionModal, dispatch] = useReducer(reducer, initialState)

  const setActionModal = (payload: ActionModal) => {
    dispatch({ type: 'SET_VISIBLE', payload: payload.visible })
    dispatch({ type: 'SET_TITLE', payload: payload.title })
    dispatch({ type: 'SET_MESSAGE', payload: payload.message })

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

  const resetActionModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { actionModal, setActionModal, resetActionModal }
}

export default useActionModal
