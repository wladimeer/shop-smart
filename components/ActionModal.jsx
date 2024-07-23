import CustomPressable from './CustomPressable'
import { Modal, View, StyleSheet, Animated } from 'react-native'
import { useTheme } from '@react-navigation/native'
import CustomText from './CustomText'
import { useEffect } from 'react'

const ActionModal = ({ actionModal, resetActionModal }) => {
  const { colors } = useTheme()
  const fadeAnimation = new Animated.Value(0)
  const animations = { fadeAnimation }

  const styles = allStyles({ colors, animations })

  const handleVisibilityChange = () => {
    const config = {
      toValue: actionModal.visible ? 1 : 0,
      useNativeDriver: true,
      duration: 300
    }

    Animated.timing(fadeAnimation, config).start()
  }

  const handleClose = () => {
    resetActionModal()
  }

  useEffect(handleVisibilityChange, [actionModal.visible])

  return (
    <Modal
      transparent={true}
      onRequestClose={handleClose}
      visible={actionModal.visible}
      animationType="fade"
    >
      <View style={styles.background} />

      <Animated.View style={styles.container}>
        <View style={styles.content}>
          <CustomText text={actionModal.title} size={22} />
          <CustomText text={actionModal.message} size={18} />

          <View style={styles.actions}>
            {actionModal.cancel && (
              <CustomPressable
                text={actionModal.cancel}
                handlePress={handleClose}
                backgroundColor={colors.septenary}
                variant="bordered"
              />
            )}

            {actionModal.confirm && (
              <CustomPressable
                text={actionModal.confirm}
                handlePress={actionModal.action}
                backgroundColor={colors.senary}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </Modal>
  )
}

const allStyles = ({ colors, animations }) => {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.quaternary,
      opacity: 0.8
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: animations.fadeAnimation.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0.5, 1]
      })
    },
    content: {
      maxWidth: 320,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: colors.modal,
      justifyContent: 'center',
      borderRadius: 8,
      padding: 12,
      gap: 22
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      gap: 15
    }
  })

  return styles
}

export default ActionModal
