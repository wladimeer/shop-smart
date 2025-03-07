import { ActivityIndicator } from 'react-native'
import SelectionModal from '../../components/SelectionModal'
import useSelectionModal from '../../hooks/useSelectionModal'
import ScreenContainer from '../../components/ScreenContainer'
import { NEW_REGISTER_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import { PRINCIPAL_SCREEN_KEY } from '../../constants/screens'
import background from '../../assets/principal-background.jpg'
import { NEW_BILL_SCREEN_KEY } from '../../constants/screens'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const NewRegister = ({ navigation }) => {
  const [translate] = useTranslation(NEW_REGISTER_SCREEN_KEY)
  const { selectionModal, setSelectionModal, resetSelectionModal } = useSelectionModal()

  const handleSelectionModal = () => {
    const options = [
      {
        name: translate('buttons.newPurchase'),
        action: () => handleNavigation(NEW_PURCHASE_SCREEN_KEY)
      },
      {
        name: translate('buttons.newBill'),
        action: () => handleNavigation(NEW_BILL_SCREEN_KEY)
      }
    ]

    setSelectionModal({
      visible: true,
      title: translate('modals.selectOption.title'),
      cancel: translate('modals.selectOption.buttons.cancel'),
      action: () => navigation.goBack(PRINCIPAL_SCREEN_KEY),
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
