import ElementGroup from '../../components/ElementGroup'
import { PRINCIPAL_SCREEN_KEY } from '../../constants/screens'
import VersionIndicator from '../../components/VersionIndicator'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import ScreenContainer from '../../components/ScreenContainer'
import background from '../../assets/principal-background.jpg'
import CustomButton from '../../components/CustomButton'
import { useTranslation } from 'react-i18next'

const Principal = ({ navigation }) => {
  const [translate] = useTranslation(PRINCIPAL_SCREEN_KEY)

  const handleNewPurchase = () => {
    navigation.navigate(NEW_PURCHASE_SCREEN_KEY)
  }

  const handleViewPurchases = () => {
    navigation.navigate(VIEW_PURCHASES_SCREEN_KEY)
  }

  return (
    <>
      <ScreenContainer background={background}>
        <ElementGroup>
          <CustomButton text={translate('buttons.newPurchase')} handlePress={handleNewPurchase} />
          <CustomButton
            text={translate('buttons.viewPurchases')}
            handlePress={handleViewPurchases}
          />
        </ElementGroup>
      </ScreenContainer>

      <VersionIndicator />
    </>
  )
}

export default Principal
