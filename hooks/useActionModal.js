import { useReducer } from 'react'

const useActionModal = () => {
  const initialState = {
    visible: false,
    title: '',
    message: '',
    action: null
  }

  const reducer = (state, { type, payload }) => {
    const types = {
      SET_VISIBLE: { ...state, visible: payload },
      SET_TITLE: { ...state, title: payload },
      SET_MESSAGE: { ...state, message: payload },
      SET_ACTION: { ...state, action: payload },
      SET_CONFIRM: { ...state, confirm: payload },
      SET_CANCEL: { ...state, cancel: payload },
      SET_RESET: initialState
    }

    return types[type] ?? state
  }

  const [actionModal, dispatch] = useReducer(reducer, initialState)

  const setActionModal = ({ visible, title, message, action, confirm, cancel }) => {
    dispatch({ type: 'SET_VISIBLE', payload: visible })
    dispatch({ type: 'SET_TITLE', payload: title })
    dispatch({ type: 'SET_MESSAGE', payload: message })
    dispatch({ type: 'SET_ACTION', payload: action })
    dispatch({ type: 'SET_CONFIRM', payload: confirm })
    dispatch({ type: 'SET_CANCEL', payload: cancel })
  }

  const resetActionModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { actionModal, setActionModal, resetActionModal }
}

export default useActionModal
