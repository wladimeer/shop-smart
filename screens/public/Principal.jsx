import ElementGroup from '../../components/ElementGroup'
import VariantFeatures from '../../components/VariantFeatures'
import { PRINCIPAL_SCREEN_KEY } from '../../constants/screens'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import { APP_SETTINGS_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import CustomButton from '../../components/CustomButton'
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
          />
          <CustomButton
            text={translate('buttons.viewPurchases')}
            handlePress={() => handleNavigation(VIEW_PURCHASES_SCREEN_KEY)}
          />
          <CustomButton
            text={translate('buttons.appSettings')}
            handlePress={() => handleNavigation(APP_SETTINGS_SCREEN_KEY)}
          />
        </ElementGroup>
      </ScreenContainer>

      <VariantFeatures />
    </>
  )
}

export default Principal
