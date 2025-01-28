import CustomPressable from './CustomPressable'
import { Modal, View, StyleSheet } from 'react-native'
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated'
import useFadeScaleAnimations from '../hooks/useFadeScaleAnimations'
import { useTheme } from '@react-navigation/native'
import CustomText from './CustomText'

const SelectionModal = ({ selectionModal, resetSelectionModal }) => {
  const { colors } = useTheme()

  const { visible, title, options, cancel } = selectionModal

  const animations = useFadeScaleAnimations(visible)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animations.fadeOpacity.value,
    transform: [{ scaleX: animations.scaleWidth.value }, { scaleY: animations.scaleHeight.value }]
  }))

  const styles = allStyles({ colors, animations })

  const handleClose = () => {
    resetSelectionModal()
  }

  return (
    <Modal transparent={true} onRequestClose={handleClose} animationType="fade" visible={visible}>
      <View style={styles.background} />

      <Reanimated.View style={[styles.container, animatedStyle]}>
        <View style={styles.content}>
          <CustomText text={title} size={22} />

          {options.length > 0 && (
            <View style={styles.actions}>
              {options.map((option, optionIndex) => (
                <CustomPressable
                  text={option.name}
                  handlePress={option.action}
                  backgroundColor={colors.senary}
                  key={optionIndex}
                />
              ))}
            </View>
          )}

          <View style={styles.actions}>
            {cancel && (
              <CustomPressable
                text={cancel}
                handlePress={handleClose}
                backgroundColor={colors.septenary}
                variant="bordered"
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

export default SelectionModal
