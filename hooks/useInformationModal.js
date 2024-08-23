import { useReducer } from 'react'

const useInformationModal = () => {
  const initialState = {
    visible: false,
    title: '',
    items: {}
  }

  const reducer = (state, { type, payload }) => {
    const types = {
      SET_VISIBLE: { ...state, visible: payload },
      SET_TITLE: { ...state, title: payload },
      SET_ITEMS: { ...state, items: payload },
      SET_RESET: initialState
    }

    return types[type] ?? state
  }

  const [informationModal, dispatch] = useReducer(reducer, initialState)

  const setInformationModal = ({ visible, title, items }) => {
    dispatch({ type: 'SET_VISIBLE', payload: visible })
    dispatch({ type: 'SET_TITLE', payload: title })
    dispatch({ type: 'SET_ITEMS', payload: items })
  }

  const resetInformationModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { informationModal, setInformationModal, resetInformationModal }
}

export default useInformationModal
