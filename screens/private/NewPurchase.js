import { Text } from 'react-native'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

const NewPurchase = () => {
  const [translate] = useTranslation(NEW_PURCHASE_SCREEN_KEY)

  return (
    <SafeAreaView>
      <Text>{translate('title')}</Text>
    </SafeAreaView>
  )
}

export default NewPurchase