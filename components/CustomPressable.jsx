import { Pressable, Text } from 'react-native'
import { lightenColor } from '../utils/color'

const CustomPressable = ({
  text = '',
  size = 20,
  align = 'center',
  textColor = '#FFFFFF',
  backgroundColor = '#1D1E2D',
  variant = 'solid',
  radius = 3,
  handlePress = null
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          borderRadius: radius,
          paddingVertical: 8
        },
        variant === 'bordered'
          ? {
              borderWidth: 2,
              borderColor: backgroundColor,
              ...(pressed && { backgroundColor })
            }
          : { backgroundColor: pressed ? lightenColor(backgroundColor, 0.1) : backgroundColor }
      ]}
      onPress={handlePress}
    >
      <Text
        style={{
          color: textColor,
          fontFamily: 'RSC-Regular',
          textAlign: align,
          fontSize: size
        }}
      >
        {text}
      </Text>
    </Pressable>
  )
}

export default CustomPressable
