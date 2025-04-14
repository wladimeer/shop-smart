import { useTheme } from '@react-navigation/native'
import { Modal, View, Text, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import useFadeScaleAnimations from '../hooks/useFadeScaleAnimations'
import { DEFAULT_INSETS } from '../constants/config'
import Octicons from '@expo/vector-icons/Octicons'
import { Fontisto } from '@expo/vector-icons'
import Spacer from './Spacer'

const InformationModal = ({ informationModal, resetInformationModal }) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const { visible, title, items } = informationModal

  const animations = useFadeScaleAnimations({ isVisible: visible, bounciness: false })

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animations.fadeOpacity.value,
    transform: [{ scaleX: animations.scaleWidth.value }, { scaleY: animations.scaleHeight.value }]
  }))

  const styles = allStyles({ colors, insets })

  const handleClose = () => {
    resetInformationModal()
  }

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" visible={visible}>
      <StatusBar
        backgroundColor={visible ? colors.tertiary : 'transparent'}
        barStyle="light-content"
      />

      <Reanimated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Fontisto name="close-a" color={colors.septenary} size={22} />
          </TouchableOpacity>
        </View>

        <Spacer color={colors.octonary} />

        {items && (
          <>
            <FlatList
              data={items}
              renderItem={({ item: { title, features }, index }) => {
                const isLastItem = index === items.length - 1
                const size = insets.bottom || DEFAULT_INSETS.BOTTOM

                return (
                  <>
                    <View style={styles.sectionContent}>
                      <Text style={styles.sectionTitle}>{title}</Text>
                    </View>

                    <View style={styles.contentContainer}>
                      {features.map((feature, featureIndex) => (
                        <View key={featureIndex} style={styles.content}>
                          <Octicons name="dot-fill" size={20} color={colors.secondary} />
                          <Text style={styles.contentItem}>{feature}</Text>
                        </View>
                      ))}
                    </View>

                    {isLastItem && <Spacer color={colors.primary} size={size} />}
                  </>
                )
              }}
              contentContainerStyle={styles.sectionContainer}
              keyExtractor={(_, itemIndex) => itemIndex}
            />
          </>
        )}
      </Reanimated.View>
    </Modal>
  )
}

const allStyles = ({ colors, insets }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      paddingTop: insets.top,
      backgroundColor: colors.tertiary,
      paddingBottom: 0
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      gap: 15
    },
    headerTitle: {
      fontSize: 22,
      color: colors.secondary
    },
    sectionContainer: {
      flexGrow: 1,
      paddingTop: 12,
      width: '100%',
      gap: 25
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 12
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'RSC-Regular',
      color: colors.secondary
    },
    contentContainer: {
      marginTop: 5,
      gap: 8
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 12
    },
    contentItem: {
      fontSize: 18,
      marginRight: 8,
      fontFamily: 'RSC-Regular',
      color: colors.secondary,
      flexShrink: 1,
      flexGrow: 1
    }
  })

  return styles
}

export default InformationModal
