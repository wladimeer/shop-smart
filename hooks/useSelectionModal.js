import { useReducer } from 'react'

const useSelectionModal = () => {
  const initialState = {
    visible: false,
    title: '',
    options: {}
  }

  const reducer = (state, { type, payload }) => {
    const types = {
      SET_VISIBLE: { ...state, visible: payload },
      SET_TITLE: { ...state, title: payload },
      SET_OPTIONS: { ...state, options: payload },
      SET_CANCEL: { ...state, cancel: payload },
      SET_RESET: initialState
    }

    return types[type] ?? state
  }

  const [selectionModal, dispatch] = useReducer(reducer, initialState)

  const setSelectionModal = ({ visible, title, options, cancel }) => {
    dispatch({ type: 'SET_VISIBLE', payload: visible })
    dispatch({ type: 'SET_TITLE', payload: title })
    dispatch({ type: 'SET_OPTIONS', payload: options })
    dispatch({ type: 'SET_CANCEL', payload: cancel })
  }

  const resetSelectionModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { selectionModal, setSelectionModal, resetSelectionModal }
}

export default useSelectionModal
