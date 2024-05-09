import { Text } from 'react-native'
import { VIEW_PURCHASES_SCREEN_KEY } from '../../constants/screens'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

const ViewPurchases = () => {
  const [translate] = useTranslation(VIEW_PURCHASES_SCREEN_KEY)

  return (
    <SafeAreaView>
      <Text>{translate('title')}</Text>
    </SafeAreaView>
  )
}

export default ViewPurchases