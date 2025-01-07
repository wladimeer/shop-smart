import { Pressable, Text, StyleSheet } from 'react-native'
import { lightenColor } from '../utils/color'

const CustomButton = ({
  text,
  children,
  handlePress,
  backgroundColor = '#154360',
  borderRadius = 22,
  width = 382
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? lightenColor(backgroundColor, 0.1) : backgroundColor,
          borderRadius,
          width
        }
      ]}
      onPress={handlePress}
    >
      <Text style={styles.label}>{text}</Text>
      {children && children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    height: 72,
    gap: 12
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'RSC-Regular',
    fontSize: 32
  }
})

export default CustomButton
