import InformationModal from './InformationModal'
import AntDesign from '@expo/vector-icons/AntDesign'
import { View, StyleSheet, Pressable } from 'react-native'
import { VARIANT_FEATURES_MODAL_KEY } from '../constants/modals'
import useInformationModal from '../hooks/useInformationModal'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import Constants from 'expo-constants'

const VariantFeatures = () => {
  const [translate] = useTranslation(VARIANT_FEATURES_MODAL_KEY)
  const { appVariant } = Constants.expoConfig.extra

  const { informationModal, setInformationModal, resetInformationModal } = useInformationModal()

  const styles = allStyles()

  const handleInformationModal = () => {
    const featuresSections = ['newPurchase', 'viewPurchases']

    const items = featuresSections.map((section) => ({
      title: translate(`${appVariant}.${section}.title`),
      features: Object.values(
        translate(`${appVariant}.${section}.features`, { returnObjects: true })
      )
    }))

    setInformationModal({ title: translate('title'), items, visible: true })
  }

  return (
    <View style={styles.container}>
      <InformationModal {...{ informationModal, resetInformationModal }} />

      <Pressable
        onPress={handleInformationModal}
        style={({ pressed }) =>
          pressed && {
            opacity: 0.7
          }
        }
      >
        <LinearGradient
          colors={['#154360', '#633974']}
          style={styles.content}
          start={[0, 0]}
          end={[1, 1]}
        >
          <AntDesign name="question" size={35} color="#FFFFFF" />
        </LinearGradient>
      </Pressable>
    </View>
  )
}

const allStyles = () => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 25,
      right: 25
    },
    content: {
      borderRadius: '100%',
      padding: 2
    }
  })

  return styles
}

export default VariantFeatures
