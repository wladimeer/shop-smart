import ElementGroup from '../../components/ElementGroup'
import VariantFeatures from '../../components/VariantFeatures'
import { PRINCIPAL_SCREEN_KEY } from '../../constants/screens'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import { APP_SETTINGS_SCREEN_KEY } from '../../constants/screens'
import { STATISTICS_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import CustomButton from '../../components/CustomButton'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'

const Principal = ({ navigation }) => {
  const [translate] = useTranslation(PRINCIPAL_SCREEN_KEY)

  const handleNavigation = (screenKey) => {
    navigation.navigate(screenKey)
  }

  return (
    <>
      <ScreenContainer background={background}>
        <ElementGroup>
          <CustomButton
            text={translate('buttons.newPurchase')}
            handlePress={() => handleNavigation(NEW_PURCHASE_SCREEN_KEY)}
          >
            <MaterialIcons name="add-shopping-cart" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={translate('buttons.viewPurchases')}
            handlePress={() => handleNavigation(VIEW_PURCHASES_SCREEN_KEY)}
          >
            <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={translate('buttons.statistics')}
            handlePress={() => handleNavigation(STATISTICS_SCREEN_KEY)}
          >
            <MaterialIcons name="query-stats" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={translate('buttons.appSettings')}
            handlePress={() => handleNavigation(APP_SETTINGS_SCREEN_KEY)}
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
