import { useTheme } from '@react-navigation/native'
import { Modal, View, Text, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import Octicons from '@expo/vector-icons/Octicons'
import { Fontisto } from '@expo/vector-icons'
import { useEffect } from 'react'
import Spacer from './Spacer'

const InformationModal = ({ informationModal, resetInformationModal }) => {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const fadeAnimation = new Animated.Value(0)
  const scaleHeight = new Animated.Value(0.2)

  const animations = { fadeAnimation, scaleHeight }

  const styles = allStyles({ colors, insets, animations })

  const { visible, title, items } = informationModal

  const handleVisibilityChange = () => {
    const toValue = visible ? 1 : 0

    if (visible) impactAsync(ImpactFeedbackStyle.Heavy)

    const configFade = {
      toValue: toValue,
      useNativeDriver: true,
      duration: Boolean(toValue) ? 500 : 1000
    }

    Animated.timing(fadeAnimation, configFade).start()

    const configScale = {
      toValue: toValue,
      useNativeDriver: true,
      bounciness: 5,
      speed: Boolean(toValue) ? 65 : 100
    }

    Animated.spring(scaleHeight, configScale).start()
  }

  const handleClose = () => {
    resetInformationModal()
  }

  useEffect(handleVisibilityChange, [visible])

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" visible={visible}>
      <View style={styles.background} />

      <Animated.View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Fontisto name="close-a" color={colors.septenary} size={22} />
          </TouchableOpacity>
        </View>

        <Spacer color={colors.octonary} />

        {items && (
          <FlatList
            data={items}
            renderItem={({ item: { title, features } }) => (
              <>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>{title}</Text>
                </View>

                <View style={styles.contentContainer}>
                  {features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.content}>
                      <Octicons name="dot-fill" size={20} color={colors.secondary} />
                      <Text key={featureIndex} style={styles.contentItem}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            contentContainerStyle={styles.sectionContainer}
            keyExtractor={(_, itemIndex) => itemIndex}
          />
        )}
      </Animated.View>
    </Modal>
  )
}

const allStyles = ({ colors, insets, animations }) => {
  const styles = StyleSheet.create({
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.quaternary,
      opacity: 0.6
    },
    container: {
      padding: 15,
      maxHeight: '80%',
      position: 'absolute',
      paddingBottom: insets.bottom,
      opacity: animations.fadeAnimation.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0.5, 1]
      }),
      transform: [{ scaleY: animations.scaleHeight }],
      backgroundColor: colors.tertiary,
      bottom: 0,
      right: 0,
      left: 0
    },
    header: {
      flex: 1,
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
      flex: 1,
      paddingVertical: 12,
      width: '100%',
      gap: 25
    },
    sectionContent: {
      display: 'flex',
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
      flex: 1,
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
