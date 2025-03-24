import ElementGroup from '../../components/ElementGroup'
import type { ScreenProps } from 'types/navigation.types'
import VariantFeatures from '../../components/VariantFeatures'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomButton from '../../components/CustomButton'
import type Translation from 'types/translation.type'
import { SCREEN_KEYS } from '../../constants/screens'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { Screen } from 'types/screen.types'
import { useTranslation } from 'react-i18next'

const Principal = ({ navigation }: ScreenProps<typeof SCREEN_KEYS.PRINCIPAL>) => {
  const { t }: Translation = useTranslation(SCREEN_KEYS.PRINCIPAL)

  const handleNavigation = (screen: Screen) => {
    navigation.navigate(screen)
  }

  return (
    <>
      <ScreenContainer background={background}>
        <ElementGroup>
          <CustomButton
            text={t('buttons.newRegister')}
            handlePress={() => handleNavigation(SCREEN_KEYS.NEW_REGISTER)}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={t('buttons.viewPurchases')}
            handlePress={() => handleNavigation(SCREEN_KEYS.VIEW_PURCHASES)}
          >
            <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
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
