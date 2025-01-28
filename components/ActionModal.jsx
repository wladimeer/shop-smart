import CustomPressable from './CustomPressable'
import { Modal, View, StyleSheet } from 'react-native'
import useFadeScaleAnimations from '../hooks/useFadeScaleAnimations'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import { useTheme } from '@react-navigation/native'
import CustomText from './CustomText'

const ActionModal = ({ actionModal, resetActionModal }) => {
  const { colors } = useTheme()

  const { visible, title, message, cancel, confirm, action } = actionModal

  const animations = useFadeScaleAnimations(visible)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animations.fadeOpacity.value,
    transform: [{ scaleX: animations.scaleWidth.value }, { scaleY: animations.scaleHeight.value }]
  }))

  const styles = allStyles({ colors })

  const handleClose = () => {
    resetActionModal()
  }

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" visible={visible}>
      <View style={styles.background} />

      <Reanimated.View style={[styles.container, animatedStyle]}>
        <View style={styles.content}>
          <CustomText text={title} size={22} />
          <CustomText text={message} size={18} />

          <View style={styles.actions}>
            {cancel && (
              <CustomPressable
                text={cancel}
                handlePress={handleClose}
                backgroundColor={colors.septenary}
                variant="bordered"
              />
            )}

            {confirm && (
              <CustomPressable
                text={confirm}
                handlePress={action}
                backgroundColor={colors.senary}
              />
            )}
          </View>
        </View>
      </Reanimated.View>
    </Modal>
  )
}

const allStyles = ({ colors }) => {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.quaternary,
      opacity: 0.9
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      maxWidth: 350,
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
