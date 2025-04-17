import SelectionModal from 'components/SelectionModal'
import ElementGroup from '../../components/ElementGroup'
import type { ScreenProps } from 'types/navigation.types'
import VariantFeatures from '../../components/VariantFeatures'
import ScreenContainer from '../../components/ScreenContainer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import useSelectionModal from 'hooks/useSelectionModal'
import type Translation from 'types/translation.type'
import { SCREEN_KEYS } from '../../constants/screens'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { Screen } from 'types/screen.types'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

const Principal = ({ navigation }: ScreenProps<Screen>) => {
  const { t }: Translation = useTranslation(SCREEN_KEYS.PRINCIPAL)
  const { selectionModal, setSelectionModal, resetSelectionModal } = useSelectionModal()

  const handleSelectionModal = () => {
    const options = [
      {
        name: t('buttons.newPurchase'),
        action: () => handleNavigation(SCREEN_KEYS.NEW_PURCHASE)
      },
      {
        name: t('buttons.newBill'),
        action: () => handleNavigation(SCREEN_KEYS.NEW_BILL)
      }
    ]

    setSelectionModal({
      visible: true,
      title: t('modals.selectOption.title'),
      cancel: t('modals.selectOption.buttons.cancel'),
      action: resetSelectionModal,
      options
    })
  }

  const handleNavigation = (screen: Screen) => {
    resetSelectionModal()
    navigation.navigate(screen)
  }

  useFocusEffect(
    useCallback(() => {
      resetSelectionModal()
    }, [])
  )

  return (
    <>
      <ScreenContainer noSafeArea={true}>
        <SelectionModal {...{ selectionModal, resetSelectionModal }} />

        <ElementGroup>
          <CustomButton text={t('buttons.newRegister')} handlePress={handleSelectionModal}>
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={t('buttons.viewPurchases')}
            handlePress={() => handleNavigation(SCREEN_KEYS.VIEW_PURCHASES)}
          >
            <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={t('buttons.viewBills')}
            handlePress={() => handleNavigation(SCREEN_KEYS.VIEW_BILLS)}
          >
            <FontAwesome name="money" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={t('buttons.statistics')}
            handlePress={() => handleNavigation(SCREEN_KEYS.STATISTICS)}
          >
            <MaterialIcons name="query-stats" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={t('buttons.appSettings')}
            handlePress={() => handleNavigation(SCREEN_KEYS.APP_SETTINGS)}
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </CustomButton>
        </ElementGroup>
      </ScreenContainer>

      <VariantFeatures />
    </>
  )
}

export default Principal
