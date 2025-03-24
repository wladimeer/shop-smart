import { ActivityIndicator } from 'react-native'
import SelectionModal from '../../components/SelectionModal'
import useSelectionModal from '../../hooks/useSelectionModal'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import { SCREEN_KEYS } from '../../constants/screens'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const NewRegister = ({ navigation }) => {
  const [translate] = useTranslation(SCREEN_KEYS.NEW_REGISTER)
  const { selectionModal, setSelectionModal, resetSelectionModal } = useSelectionModal()

  const handleSelectionModal = () => {
    const options = [
      {
        name: translate('buttons.newPurchase'),
        action: () => handleNavigation(SCREEN_KEYS.NEW_PURCHASE)
      },
      {
        name: translate('buttons.newBill'),
        action: () => handleNavigation(SCREEN_KEYS.NEW_BILL)
      }
    ]

    setSelectionModal({
      visible: true,
      title: translate('modals.selectOption.title'),
      cancel: translate('modals.selectOption.buttons.cancel'),
      action: () => navigation.goBack(SCREEN_KEYS.PRINCIPAL),
      options
    })
  }

  const handleNavigation = (screenKey) => {
    navigation.replace(screenKey)
  }

  useEffect(handleSelectionModal, [])

  return (
    <ScreenContainer background={background} noSafeArea={true}>
      <SelectionModal {...{ selectionModal, resetSelectionModal }} />

      <ActivityIndicator size="large" />
    </ScreenContainer>
  )
}

export default NewRegister
