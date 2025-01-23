import CustomButton from '../../components/CustomButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import ScreenContainer from '../../components/ScreenContainer'
import { NEW_REGISTER_SCREEN_KEY } from '../../constants/screens'
import { NEW_PURCHASE_SCREEN_KEY } from '../../constants/screens'
import background from '../../assets/principal-background.jpg'
import { NEW_BILL_SCREEN_KEY } from '../../constants/screens'
import { StyleSheet, ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const NewRegister = ({ navigation }) => {
  const [translate] = useTranslation(NEW_REGISTER_SCREEN_KEY)
  const { colors } = useTheme()

  const styles = allStyles({ colors })

  const handleNavigation = (screenKey) => {
    navigation.navigate(screenKey)
  }

  return (
    <ScreenContainer background={background} noSafeArea={true}>
      <ScrollView style={styles.container}>
        <View style={styles.itemsContainer}>
          <CustomButton
            text={translate('buttons.newPurchase')}
            handlePress={() => handleNavigation(NEW_PURCHASE_SCREEN_KEY)}
            {...styles.button}
          >
            <MaterialIcons name="add-shopping-cart" size={24} color="white" />
          </CustomButton>

          <CustomButton
            text={translate('buttons.newBill')}
            handlePress={() => handleNavigation(NEW_BILL_SCREEN_KEY)}
            {...styles.button}
          >
            <MaterialIcons name="playlist-add" size={24} color="white" />
          </CustomButton>
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    itemsContainer: {
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 10,
      gap: 10
    },
    button: {
      borderRadius: 3,
      backgroundColor: colors.quinary,
      width: '100%'
    }
  })

  return styles
}

export default NewRegister
