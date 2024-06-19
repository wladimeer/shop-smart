import ScreenContainer from '../../components/ScreenContainer'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { useTranslation } from 'react-i18next'

const ViewPurchases = () => {
  const [translate] = useTranslation(VIEW_PURCHASES_SCREEN_KEY)

  return <ScreenContainer></ScreenContainer>
}

export default ViewPurchases
